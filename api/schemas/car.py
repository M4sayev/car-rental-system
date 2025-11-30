from pydantic import BaseModel
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