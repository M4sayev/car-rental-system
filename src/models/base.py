from abc import ABC, abstractmethod
from datetime import datetime

class Vehicle(ABC):
    """
    Abstract base class representing a generic vehicle.

    Attributes:
        vehicle_id (str): Unique identifier for the vehicle.
        brand (str): Vehicle brand.
        model (str): Vehicle model.
        daily_rate (float): Daily rental cost.
        is_available (bool): Availability status of the vehicle.
    """

    def __init__(self, vehicle_id: str, brand: str, model: str, daily_rate: float):
        """
        Initialize a Vehicle object.

        Args:
            vehicle_id (str): Unique identifier for the vehicle.
            brand (str): Vehicle brand.
            model (str): Vehicle model.
            daily_rate (float): Daily rental cost.
        """
        self._vehicle_id = vehicle_id
        self._brand = brand
        self._model = model
        self._daily_rate = daily_rate
        self._is_available = True

        # immediate validation
        self._validate()
    
    # keep the base validate abstract (expose the inherited validation instead)
    def _validate(self):
        """Internal validation for vehicle attributes."""
        if not self._vehicle_id or not isinstance(self._vehicle_id, str):
            raise ValueError("Vehicle ID must be a non-empty string")
        if not self._brand or not isinstance(self._brand, str):
            raise ValueError("Brand must be a non-empty string")
        if not self._model or not isinstance(self._model, str):
            raise ValueError("Brand must be a non-empty string")
        if not isinstance(self._daily_rate, (int, float)) or self._daily_rate <= 0:
            raise ValueError("Daily rate must be a positive number")

    @abstractmethod
    def calculate_rental_cost(self, days: int) -> float:
        """
        Abstract method to calculate rental cost for a given number of days.
        Must be implemented by subclasses to support polymorphism.

        Args:
            days (int): Number of rental days.

        Returns:
            float: Total rental cost.
        """
        pass

    @property
    def vehicle_id(self) -> str:
        """Get the vehicle's unique identifier."""
        return self._vehicle_id

    @property
    def brand(self) -> str:
        """Get the vehicle's brand."""
        return self._brand

    @property
    def model(self) -> str:
        """Get the vehicle's model."""
        return self._model

    @property
    def daily_rate(self) -> float:
        """Get the vehicle's daily rental rate."""
        return self._daily_rate

    @property
    def is_available(self) -> bool:
        """Check if the vehicle is available for rent."""
        return self._is_available

    @is_available.setter
    def is_available(self, value: bool):
        """
        Set the availability status of the vehicle.

        Args:
            value (bool): True if available, False otherwise.
        """
        self._is_available = value
