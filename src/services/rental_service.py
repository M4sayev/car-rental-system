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
        self.cars_repo = cars_repo
        self.clients_repo = clients_repo
        self.rentals_repo = rentals_repo

    def add_car(self, car: Car) -> bool:
        """Add a new car to the system"""
        car_dict = car.to_dict()
        return self.cars_repo.create(car_dict)

    def get_car(self, vehicle_id: str) -> Optional[Car]:
        """Get car by ID"""
        car_dict = self.cars_repo.find_by_id(vehicle_id)
        if car_dict:
            return Car.from_dict(car_dict)
        return None

    def get_available_cars(self) -> List[Car]:
        """Get all available cars"""
        all_cars = self.cars_repo.read_all()
        available_cars = []
        for car_dict in all_cars:
            car = Car.from_dict(car_dict)
            if car.is_available:
                available_cars.append(car)
        return available_cars

    def add_client(self, client: Client) -> bool:
        """Add a new client to the system"""
        client_dict = client.to_dict()
        return self.clients_repo.create(client_dict)

    def get_client(self, client_id: str) -> Optional[Client]:
        """Get client by ID"""
        client_dict = self.clients_repo.find_by_id(client_id)
        if client_dict:
            return Client.from_dict(client_dict)
        return None

    def create_rental(self, rental_id: str, car_id: str, client_id: str,
                     start_date: Optional[datetime] = None) -> Optional[Rental]:
        """Create a new rental"""
        car = self.get_car(car_id)
        if not car:
            logger.error(f"Car not found: {car_id}")
            return None

        if not car.is_available:
            logger.error(f"Car is not available: {car_id}")
            return None

        client = self.get_client(client_id)
        if not client:
            logger.error(f"Client not found: {client_id}")
            return None

        if start_date is None:
            start_date = datetime.now()

        rental = Rental(rental_id, car, client, start_date)
        car.is_available = False

        # Update car availability in repository
        car_dict = car.to_dict()
        self.cars_repo.update(car_id, car_dict)

        # Save rental
        rental_dict = rental.to_dict()
        if self.rentals_repo.create(rental_dict):
            return rental
        return None

    def complete_rental(self, rental_id: str, end_date: Optional[datetime] = None) -> bool:
        """Complete a rental and make car available again"""
        rental_dict = self.rentals_repo.find_by_id(rental_id)
        if not rental_dict:
            logger.error(f"Rental not found: {rental_id}")
            return False

        rental = Rental.from_dict(rental_dict)
        if not rental.is_active:
            logger.warning(f"Rental already completed: {rental_id}")
            return False

        rental.complete_rental(end_date)

        # Update car availability
        car_dict = rental.car.to_dict()
        self.cars_repo.update(rental.car.vehicle_id, car_dict)

        # Update rental
        rental_dict = rental.to_dict()
        return self.rentals_repo.update(rental_id, rental_dict)

    def get_active_rentals(self) -> List[Rental]:
        """Get all active rentals"""
        all_rentals = self.rentals_repo.read_all()
        active_rentals = []
        for rental_dict in all_rentals:
            rental = Rental.from_dict(rental_dict)
            if rental.is_active:
                active_rentals.append(rental)
        return active_rentals