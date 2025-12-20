from fastapi import APIRouter, HTTPException, Query
from api.dependencies import rental_service
from typing import List, Optional
from datetime import datetime

# import schemas
from api.schemas.rental import RentalResponse
from api.schemas.response import ResponseModel

router = APIRouter()

@router.get("/rentals", response_model=ResponseModel[List[RentalResponse]])
def get_all_rentals() -> List[dict]:
    # deserialize the rentals 
    rentals = rental_service.get_all_rentals()
    data = [rental.to_dict() for rental in rentals]
    return {
        "message": "success",
        "data": data
    }

@router.get("/rentals/active", response_model=ResponseModel[List[RentalResponse]])
def get_active_rentals() -> List[dict]:
    # deserialize the rentals 
    rentals = rental_service.get_active_rentals()
    data = [rental.to_dict() for rental in rentals]
    return {
        "message": "success",
        "data": data
    }


@router.patch("/rentals/{rental_id}/complete", response_model=ResponseModel[RentalResponse])
def complete_rental(rental_id: str, end_date: Optional[datetime] = Query(None)) -> dict:
    result = rental_service.complete_rental(rental_id, end_date)
    if not result:
        raise HTTPException(status_code=404, detail=f"Rental with id {rental_id} not found or already completed")
    data = result.to_dict()
    return {"message": f"Rental {rental_id} successfully completed", "data": data}

@router.post("/rentals", response_model=ResponseModel[dict])
def create_rental(car_id: str, client_id: str, start_date: Optional[datetime] = None) -> dict:

    result = rental_service.create_rental(car_id, client_id, start_date)
    if not result:
        raise HTTPException(status_code=404, detail=f"Car is not available or either id is not found")
    data = result.to_dict()
    return {"message": "Rental has been successfully created", "data": data}


@router.delete("/rentals/{rental_id}", response_model=ResponseModel[dict])
def delete_rental(rental_id: str) -> dict:
    result = rental_service.delete_rental(rental_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Rental with id {rental_id} not found")

    data = result.to_dict()

    return {
        "message": "success",
        "data": data
    }
