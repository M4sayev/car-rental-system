from fastapi import APIRouter

from api.dependencies import client_service, car_service, rental_service

# import schemas 
from api.schemas.response import ResponseModel
from api.schemas.dashboard import OverviewResponse, RecentRentalsResponse

from typing import List

router = APIRouter()

@router.get("/dashboard/overview", response_model=ResponseModel[OverviewResponse])
def get_overview() -> dict:
    cars = car_service.get_available_cars()
    clients = client_service.get_all_clients()
    rentals = rental_service.get_active_rentals()
    overview = {
        "available_cars": len(cars),
        "total_clients": len(clients),
        "active_rentals": len(rentals)
    }

    return {
        "message": "success",
        "data": overview
    }

# TO BE IMPLEMENTED
# @router.get("dashboard/recent-rentals", response_model=ResponseModel[List[RecentRentalsResponse]])
# def get_recent_rentals() -> dict:
#     rentals = rental_service.get_active_rentals()

        
