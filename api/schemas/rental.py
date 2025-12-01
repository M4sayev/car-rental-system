from pydantic import BaseModel
from api.schemas.car import CarResponse
from api.schemas.client import ClientResponse
from datetime import datetime
from typing import Optional

class RentalResponse(BaseModel):
    rental_id: str
    car: CarResponse
    client: ClientResponse
    start_date: datetime
    total_cost: float
    end_date: Optional[datetime]
    is_active: bool