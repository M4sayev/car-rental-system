from pydantic import BaseModel
from datetime import datetime

# Car schema
class CarSchema(BaseModel):
    brand: str
    model: str
    daily_rate: float
    car_type: str
    seats: int

class CarResponse(BaseModel):
    vehicle_id: str
    brand: str
    model: str
    daily_rate: float
    car_type: str
    seats: int
    is_available: bool
    image_url: str

class DeletedCarSchema(CarSchema):
    deletion_date: datetime

class DeletedCarResponse(CarResponse):
    deletion_date: datetime