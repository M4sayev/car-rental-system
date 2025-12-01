from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class OverviewResponse(BaseModel):
    available_cars: int
    total_clients: int
    active_rentals: int

class RecentRentalsResponse(BaseModel):
    rental_id: str
    car_name: str
    client_name: str
    start_date: datetime
    end_date: Optional[datetime]
    status: str