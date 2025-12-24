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

# return recent rentals with car name and client name istead of the whole car, client dict
@router.get("/dashboard/recent-rentals", response_model=ResponseModel[List[RecentRentalsResponse]])
def get_recent_rentals() -> dict:
    rentals = rental_service.get_all_rentals()

    
    sorted_rentals = sorted(rentals, key=lambda rental: rental.start_date, reverse=True)[:5]
    # turn car, client objects into their models, names
    data = [
        {
            "rental_id": rental.rental_id,
            "car_name": f"{rental.car.brand} {rental.car.model} ({rental.car.car_type})",
            "client_name": rental.client.name,
            "start_date": rental.start_date,
            "end_date": rental.end_date,
            "status": "active" if rental.is_active else "completed" 

        } for rental in sorted_rentals 
    ]

    return {
        "message": "success",
        "data": data
    }

        
