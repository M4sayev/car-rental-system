from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class OverviewResponse(BaseModel):
    available_cars: str
    total_clients: str
    active_rentals: str

class RecentRentalsResponse(BaseModel):
    rentail_id: str
    car_name: str
    client_name: str
    start_date: datetime
    end_date: Optional[datetime]
    status: str