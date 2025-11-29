from datetime import datetime
from typing import List, Optional
from src.models.car import Car
from src.models.client import Client
from src.models.rental import Rental
from src.repositories.base_repository import Repository
import uuid
import logging

logger = logging.getLogger(__name__)


class RentalService:
    """Service layer - Business logic"""

    def __init__(self, cars_repo: Repository, clients_repo: Repository, rentals_repo: Repository):
        self.cars_repo = cars_repo
        self.clients_repo = clients_repo
        self.rentals_repo = rentals_repo
    
    @staticmethod
    def _generate_id() -> str:
        return str(uuid.uuid4())

    def add_car(self, car: Car) -> Car | bool:
        """Add a new car to the system"""
        # Set the id dynamically
        car_id = self._generate_id()
        car = Car(car_id, car.brand, car.model, car.daily_rate, car.car_type, car.seats)
        car_dict = car.to_dict()
        if self.cars_repo.create(car_dict):
            return car
        return False

    def get_car(self, vehicle_id: str) -> Optional[Car]:
        """Get car by ID"""
        car_dict = self.cars_repo.find_by_id(vehicle_id)
        if car_dict:
            return Car.from_dict(car_dict)
        return None
    
    def update_car(self, vehicle_id: str, updated_fields: dict) -> Car | bool:
        """Update car by ID"""
        car = self.cars_repo.update(vehicle_id, updated_fields)
        if not car:
            return False
        return Car.from_dict(car)
    
    def delete_car(self, vehicle_id: str) -> bool | Car:
        """Delete car by ID"""
        # Warn if the car is currently rented 
        active_rentals = self.rentals_repo.read_all()

        for rental in active_rentals:
            if rental["car"]["vehicle_id"] == vehicle_id and rental.get("is_active", True):
                logger.warning(f"Cannot delete car {vehicle_id}, it is currently rented.")
                return False
        car = self.cars_repo.delete(vehicle_id)
        if not car:
            return False
        return Car.from_dict(car)

    def get_available_cars(self) -> List[Car]:
        """Get all available cars"""
        all_cars = self.cars_repo.read_all()
        available_cars = []
        for car_dict in all_cars:
            car = Car.from_dict(car_dict)
            if car.is_available:
                available_cars.append(car)
        return available_cars
    
    def get_client(self, client_id: str) -> Optional[Client]:
        """Get client by ID"""
        client_dict = self.clients_repo.find_by_id(client_id)
        if client_dict:
            return Client.from_dict(client_dict)
        return None

    def get_all_clients(self) -> List[Client]:
        """Get all client"""
        all_clients = self.clients_repo.read_all()
        clients = [Client.from_dict(client) for client in all_clients]
        return clients

    def add_client(self, client: Client) -> Client | bool:
        """Add a new client to the system"""
        # Set the id dynamically
        client_id = self._generate_id()
        client = Client(client_id, client.name, client.email, client.phone)
        client_dict = client.to_dict()
        if self.clients_repo.create(client_dict):
            return client
        return False
    
    def delete_client(self, client_id: str) -> Client | bool:
        """Delete car by ID"""
        client = self.clients_repo.delete(client_id)
        if not client:
            return False 
        return Client.from_dict(client)


    def create_rental(self, car_id: str, client_id: str,
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

        # Set the id dynamically
        rental_id = self._generate_id()

        rental = Rental(rental_id, car, client, start_date)
        car.is_available = False

        # Update car availability in repository
        car_dict = car.to_dict()

        # Remove vehicle_id to avoid passing it in update
        del car_dict["vehicle_id"]
        self.cars_repo.update(car_id, car_dict)

        # Save rental
        rental_dict = rental.to_dict()


        if self.rentals_repo.create(rental_dict):
            return rental
        return None

    def complete_rental(self, rental_id: str, end_date: Optional[datetime] = None) -> bool | Rental:
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

        # Remove vehicle_id to avoid passing it in update
        del car_dict["vehicle_id"]

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