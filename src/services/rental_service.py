from datetime import datetime
from typing import List, Optional
from ..models.car import Car
from ..models.client import Client
from ..models.rental import Rental
from ..repositories.repository import Repository
import logging

logger = logging.getLogger(__name__)


class RentalService:
    """Service layer - Business logic"""

    def __init__(self, cars_repo: Repository, clients_repo: Repository, rentals_repo: Repository):
        """
        Initialize RentalService with repository instances.
        
        Args:
            cars_repo (Repository): Repository for Car objects.
            clients_repo (Repository): Repository for Client objects.
            rentals_repo (Repository): Repository for Rental objects.
        """
        self.cars_repo = cars_repo
        self.clients_repo = clients_repo
        self.rentals_repo = rentals_repo

    def add_car(self, car: Car) -> bool:
        """Add a new car to the system.
        
        Args:
            car (Car): Car object to add.
        
        Returns:
            bool: True if created successfully, False otherwise.
        """
        # Student B will implement actual repository logic
        raise NotImplementedError("Student B should implement this method")

    def get_car(self, vehicle_id: str) -> Optional[Car]:
        """Retrieve a car by its ID."""
        raise NotImplementedError("Student B should implement this method")

    def get_available_cars(self) -> List[Car]:
        """Return all available cars."""
        raise NotImplementedError("Student B should implement this method")

    def add_client(self, client: Client) -> bool:
        """Add a new client to the system."""
        raise NotImplementedError("Student B should implement this method")

    def get_client(self, client_id: str) -> Optional[Client]:
        """Retrieve a client by ID."""
        raise NotImplementedError("Student B should implement this method")

    def create_rental(self, rental_id: str, car_id: str, client_id: str,
                      start_date: Optional[datetime] = None) -> Optional[Rental]:
        """Create a new rental.
        
        Args:
            rental_id (str): Unique rental ID.
            car_id (str): ID of the car to rent.
            client_id (str): ID of the client.
            start_date (datetime, optional): Rental start date.
        
        Returns:
            Rental | None: Rental object if creation succeeds, else None.
        """
        raise NotImplementedError("Student B should implement this method")

    def complete_rental(self, rental_id: str, end_date: Optional[datetime] = None) -> bool:
        """Complete a rental and calculate the total cost.
        
        Args:
            rental_id (str): ID of the rental to complete.
            end_date (datetime, optional): End date for the rental.
        
        Returns:
            bool: True if rental completed successfully, False otherwise.
        """
        raise NotImplementedError("Student B should implement this method")

    def get_active_rentals(self) -> List[Rental]:
        """Return all active rentals."""
        raise NotImplementedError("Student B should implement this method")
