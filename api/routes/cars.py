from fastapi import FastAPI, HTTPException
from api.dependencies import service
from typing import List

from src.models.car import Car

from pydantic import BaseModel

app = FastAPI()

# Car schema
class CarSchema(BaseModel):
    brand: str
    model: str
    daily_rate: float
    car_type: str
    seats: int

@app.get("/cars", response_model=List[dict])
def get_cars() -> List[dict]:
    # deserialize the cars 
    cars = service.get_available_cars()
    data = [car.to_dict() for car in cars]
    return {
        "message": "success",
        "data" : data
    }

@app.get("/cars/{vehicle_id}", response_model=dict)
def get_single_car(vehicle_id: str) -> dict:
    car = service.get_car(vehicle_id)
    if not car:
        raise HTTPException(status_code=404, detail=f"Car with id {vehicle_id} not found")
    data = car.to_dict()
    return {
        "message": "success", "data": data
    }

@app.post("/cars", response_model=dict)
def create_car(data: CarSchema) -> dict:
    # create temp ID to avoid sending id to update 
    temp_car = Car("TEMP", data.brand, data.model, data.daily_rate, data.car_type, data.seats)
    result = service.add_car(temp_car)
    if not result:
        raise HTTPException(status_code=400, detail="Something went wrong")
    data = result.to_dict()
    return {"message": "Car has been successfully created", "data": data}

@app.patch("/cars/{vehicle_id}", response_model=dict)
def update_car(vehicle_id: str) -> dict:
    result = service.update_car(vehicle_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Car with id {vehicle_id} not found")
    data = result.to_dict()
    return {"message": f"Car updated successfully", "data": data}

@app.delete("/cars/{vehicle_id}", response_model=dict)
def delete_car(vehicle_id: str) -> dict:
    result = service.delete_car(vehicle_id)
    if not result:
        raise HTTPException(status_code=400, detail="Car cannot be deleted (rented or doesn't exist)")
    data = result.to_dict()
    return {"message": f"Car deleted successfully", "data": data}


    