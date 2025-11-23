from .base import Vehicle

class Car(Vehicle):
    """Represents a car in the rental system. SUVs have a higher rental cost."""

    SUV_COST_COEFFICIENT = 1.2

    def __init__(self, vehicle_id: str, brand: str, model: str,
                 daily_rate: float, car_type: str, seats: int):
        super().__init__(vehicle_id, brand, model, daily_rate)
        self._car_type = car_type
        self._seats = seats

    def calculate_rental_cost(self, days: int) -> float:
        """Calculate rental cost; applies SUV multiplier if applicable."""
        base_cost = self._daily_rate * days
        if self._car_type.lower() == "suv":
            return base_cost * self.SUV_COST_COEFFICIENT
        return base_cost

    @property
    def car_type(self):
        """Get the cars's type."""
        return self._car_type

    @property
    def seats(self):
        """Get the cars's number of seats."""
        return self._seats

    def to_dict(self) -> dict:
        """Convert Car object to a dictionary for JSON serialization."""
        return {
            'vehicle_id': self._vehicle_id,
            'brand': self._brand,
            'model': self._model,
            'daily_rate': self._daily_rate,
            'car_type': self._car_type,
            'seats': self._seats,
            'is_available': self._is_available
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Car":
        """Create a Car object from a dictionary (JSON deserialization)."""
        car = cls(
            vehicle_id=data['vehicle_id'],
            brand=data['brand'],
            model=data['model'],
            daily_rate=data['daily_rate'],
            car_type=data['car_type'],
            seats=data['seats']
        )
        car._is_available = data.get('is_available', True)
        return car
