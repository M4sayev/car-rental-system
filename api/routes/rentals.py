from fastapi import FastAPI, HTTPException
from api.dependencies import service
from typing import List, Optional
from datetime import datetime
from src.models.rental import Rental

app = FastAPI()


@app.get("/rentals", response_model=dict)
def get_rentals() -> List[dict]:
    # deserialize the rentals 
    rentals = service.get_active_rentals()
    data = [rental.to_dict() for rental in rentals]
    return {
        "message": "success",
        "data": data
    }

@app.patch("/rentals/{rental_id}", response_model=dict)
def complete_rental(rental_id: str) -> dict:
    result = service.complete_rental(rental_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Rental with id {rental_id} not found or already completed")
    data = result.to_dict()
    return {"message": f"Rental {rental_id} successfully completed", "data": data}

@app.post("/rentals", response_model=dict)
def create_rental(car_id: str, client_id: str, start_date: Optional[datetime] = None) -> dict:

    result = service.create_rental(car_id, client_id, start_date)
    if not result:
        raise HTTPException(status_code=404, detail=f"Car is not available or either id is not found")
    data = result.to_dict()
    return {"message": "Rental has been successfully created", "data": data}