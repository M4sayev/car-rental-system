from fastapi import APIRouter, HTTPException, Query, Body
from api.dependencies import car_service
from typing import List

from src.models.car import Car

# import schemas
from api.schemas.car import CarSchema, CarResponse, DeletedCarResponse
from api.schemas.response import ResponseModel  

router = APIRouter()

@router.get("/cars", response_model=ResponseModel[List[CarResponse]])
def get_cars() -> List[dict]:
    # deserialize the cars 
    cars = car_service.get_available_cars()
    data = [car.to_dict() for car in cars]
    return {
        "message": "success",
        "data" : data
    }


@router.get("/cars/deleted", response_model=ResponseModel[List[DeletedCarResponse]])
def get_deleted_cars() -> List[dict]:
     # no need to deserialize cuz get_deleted_cars returns dict
    data = car_service.get_deleted_cars()
    return {
        "message": "success",
        "data": data
    }

@router.get("/cars/{vehicle_id}", response_model=ResponseModel[CarResponse])
def get_single_car(vehicle_id: str) -> dict:
    car = car_service.get_car(vehicle_id)
    if not car:
        raise HTTPException(status_code=404, detail=f"Car with id {vehicle_id} not found")
    data = car.to_dict()
    return {
        "message": "success", "data": data
    }


@router.post("/cars", response_model=dict)
def create_car(data: CarSchema) -> dict:
    # create temp ID to avoid sending id to update 
    temp_car = Car("TEMP", data.brand, data.model, data.daily_rate, data.car_type, data.seats)
    result = car_service.add_car(temp_car)
    if not result:
        raise HTTPException(status_code=400, detail="Something went wrong")
    data = result.to_dict()
    return {"message": "Car has been successfully created", "data": data}

@router.patch("/cars/{vehicle_id}", response_model=dict)
def update_car(vehicle_id: str, updated_fields: dict = Body(...)) -> dict:
    result = car_service.update_car(vehicle_id, updated_fields)
    if not result:
        raise HTTPException(status_code=404, detail=f"Car with id {vehicle_id} not found")
    data = result.to_dict()
    return {"message": f"Car updated successfully", "data": data}

@router.delete("/cars/{vehicle_id}", response_model=dict)
def delete_car(vehicle_id: str) -> dict:
    result = car_service.delete_car(vehicle_id)
    if not result:
        raise HTTPException(status_code=400, detail="Car cannot be deleted (rented or doesn't exist)")
    data = result.to_dict()
    return {"message": f"Car deleted successfully", "data": data}

@router.get("/cars/{vehicle_id}/rental-cost", response_model=dict)
def get_rental_cost(vehicle_id: str, days: int = Query(..., gt=0)):
    # Calculate the rental cost for a given car and number of days.
    cost = car_service.calculate_rental_cost(vehicle_id, days)
    if not cost:
        raise HTTPException(status_code=404, detail=f"Car with id {vehicle_id} not found")
    return {
        "message": "success",
        "data": cost
    }
    
    