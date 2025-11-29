from .car import Car
from .client import Client
from datetime import datetime
from typing import Optional


class Rental:
    """
    Represents a car rental transaction between a client and the rental system.

    Attributes:
        rental_id (str): Unique identifier for the rental.
        car (Car): The car being rented.
        client (Client): The client renting the car.
        start_date (datetime): Start date of the rental.
        end_date (Optional[datetime]): End date of the rental (None if ongoing).
        total_cost (float): Total cost of the rental.
        is_active (bool): Indicates if the rental is currently active.
    """

    def __init__(self, rental_id: str, car: Car, client: Client, start_date: datetime, end_date: Optional[datetime] = None):
        """
        Initialize a Rental object.

        Args:
            rental_id (str): Unique identifier for the rental.
            car (Car): Car object of the rental.
            client (Client): Client object that rents the car.
            start_date (datetime): Start date of the rental.
            end_date (datetime, optional): End date of the rental. Defaults to None.
        """
        self._rental_id = rental_id
        self._car = car
        self._client = client
        self._start_date = start_date
        self._end_date = end_date
        self._total_cost = 0.0

        # validate on initialization
        self.validate()

    def __str__(self):
        status = "Active" if self.is_active else "Completed"
        return f"Rental[{self._rental_id}] Car: {self._car.brand} {self._car.model} | Client: {self._client.name} | Status: {status} | Total: ${self._total_cost:.2f}"


    def validate(self):
        """Public validation callable by service layer"""
        if not isinstance(self._rental_id, str) or not self._rental_id.strip():
            raise ValueError("Rental ID must be a non-empty string")

        if not isinstance(self._car, Car):
            raise TypeError("Car must be a Car object")
        self._car.validate()  # Validate the car itself

        if not isinstance(self._client, Client):
            raise TypeError("Client must be a Client object")
        self._client.validate()  # Validate the client itself

        if not isinstance(self._start_date, datetime):
            raise TypeError("Start date must be a datetime object")
        
        if self._end_date:
            self._validate_end_date(value=self._end_date)
            
    def _validate_end_date(self, value):
        if not isinstance(value, datetime):
            raise TypeError("End date must be a datetime object")
        if value < self._start_date:
            raise ValueError("End date cannot be before start date")

    @property
    def rental_id(self) -> str:
        """Return the rental's unique identifier."""
        return self._rental_id

    @property
    def car(self) -> Car:
        """Return the Car object associated with the rental."""
        return self._car

    @property
    def client(self) -> Client:
        """Return the Client object associated with the rental."""
        return self._client

    @property
    def start_date(self) -> datetime:
        """Return the rental start date."""
        return self._start_date

    @property
    def end_date(self) -> Optional[datetime]:
        """Return the rental end date, if set."""
        return self._end_date

    @end_date.setter
    def end_date(self, value: datetime):
        """
        Set the rental end date.

        Args:
            value (datetime): End date to set.

        Raises:
            TypeError: If value is not a datetime object.
        """
        self._validate_end_date(value)
        self._end_date = value
        self.calculate_total_cost()

    @property
    def total_cost(self) -> float:
        """Return the total cost of the rental."""
        return self._total_cost

    @property
    def is_active(self) -> bool:
        """Return True if the rental is currently active, False otherwise."""
        return self._end_date is None

    def calculate_total_cost(self) -> float:
        """
        Calculate the total rental cost based on the duration.

        Returns:
            float: Total cost of the rental.
        """
        end = self._end_date or datetime.now()
        days = (end - self._start_date).days
        if days <= 0:
            days = 1  # Minimum 1 day
        self._total_cost = self._car.calculate_rental_cost(days)
        return self._total_cost

    def complete_rental(self, end_date: Optional[datetime] = None):
        """
        Mark the rental as completed, set the end date, calculate total cost, 
        and make the car available again.

        Args:
            end_date (datetime, optional): End date of the rental. Defaults to now.
        """
        if not self.is_active:
            return False
        self.end_date = end_date or datetime.now()
        self._car.is_available = True
        return True

    def to_dict(self) -> dict:
        """
        Convert the Rental object to a dictionary suitable for JSON serialization.

        Returns:
            dict: Dictionary representation of the rental.
        """
        return {
            'rental_id': self._rental_id,
            'car': self._car.to_dict(),
            'client': self._client.to_dict(),
            'start_date': self._start_date.isoformat(),
            'end_date': self._end_date.isoformat() if self._end_date else None,
            'total_cost': self.calculate_total_cost(),
            'is_active': self.is_active
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Rental":
        """
        Create a Rental object from a dictionary (JSON deserialization).

        Args:
            data (dict): Dictionary containing rental data.

        Returns:
            Rental: Instantiated Rental object.
        """
        car = Car.from_dict(data['car'])
        client = Client.from_dict(data['client'])
        rental = cls(
            rental_id=data['rental_id'],
            car=car,
            client=client,
            start_date=datetime.fromisoformat(data['start_date']),
            end_date=datetime.fromisoformat(data['end_date']) if data.get('end_date') else None
        )
        rental.calculate_total_cost() # recalculate to ensure consistency
        return rental
