from src.models.base import Vehicle
from src.models.strategies.rental_cost_interface import RentalCostStrategy
from src.models.strategies.cost_strategy import SUVRentalCost, StandardCarCost, LongTermRentalCost, HolidayDiscount

class Car(Vehicle):
    """Represents a car in the rental system. SUVs have a higher rental cost."""

    def __init__(self, vehicle_id: str, brand: str, model: str,
                 daily_rate: float, car_type: str, seats: int, is_available: bool = True, image_url = None):
        super().__init__(vehicle_id, brand, model, daily_rate)
        self._car_type = car_type
        self._seats = seats
        self._is_available = is_available
        self.image_url = image_url
        
        # choose a base strategy based on car type
        if car_type.lower() == "suv":
            self._rental_cost_strategy: RentalCostStrategy = SUVRentalCost()
        else:
            self._rental_cost_strategy: RentalCostStrategy = StandardCarCost()

        # apply long term strategy
        self._rental_cost_strategy = LongTermRentalCost(self._rental_cost_strategy)

        # apply holiday strategy 
        self._rental_cost_strategy = HolidayDiscount(self._rental_cost_strategy)

        # validate on initialization
        self.validate()
    
    def __str__(self):
        base_str = super().__str__()
        return f"{base_str} | Type: {self._car_type}, Seats: {self._seats}"

    def calculate_rental_cost(self, days: int) -> float:
        """Calculate rental cost; applies SUV multiplier if applicable."""
        return self._rental_cost_strategy.calculate_cost(self, days)
    def validate(self):
        """Public validation callable by service layer"""
        if not isinstance(self._car_type, str) or not self._car_type.strip():
            raise ValueError("Car type must be a non-empty string")
        if not isinstance(self._seats, int) or self._seats <= 0:
            raise ValueError("Number of seats must be a positive integer")
        
        super().validate()

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
            'is_available': self._is_available,
            "image_url": self.image_url or "/media/cars/default_car.jpg"
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
            seats=data['seats'],
            # extra fallback
            image_url=data.get('image_url', "/media/cars/default_car.jpg")
        )
        car._is_available = data.get('is_available', True)
        return car
