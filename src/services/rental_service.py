from datetime import datetime
from typing import List, Optional
from src.models.rental import Rental
from src.repositories.base_repository import Repository
from src.services.car_service import CarService 
from src.services.client_service import ClientService
import uuid
import logging

logger = logging.getLogger(__name__)


class RentalService:
    """Service layer - Business logic"""

    def __init__(self, rentals_repo: Repository, car_service: CarService, client_service: ClientService):
        self.rentals_repo = rentals_repo
        self.car_service = car_service
        self.client_service = client_service
    
    @staticmethod
    def _generate_id() -> str:
        return str(uuid.uuid4())

    def create_rental(self, car_id: str, client_id: str,
                     start_date: Optional[datetime] = None) -> Optional[Rental]:
        """Create a new rental"""
        car = self.car_service.get_car(car_id)
        if not car:
            logger.error(f"Car not found: {car_id}")
            return None

        if not car.is_available:
            logger.error(f"Car is not available: {car_id}")
            return None

        client = self.client_service.get_client(client_id)
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
        self.car_service.update_car(car_id, car_dict)

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

        self.car_service.update_car(rental.car.vehicle_id, car_dict)

        # Update rental
        rental_dict = rental.to_dict()
        del rental_dict["rental_id"]

        result = self.rentals_repo.update(rental_id, rental_dict)
        if not result:
            return False
        return Rental.from_dict(result)

    def get_active_rentals(self) -> List[Rental]:
        """Get all active rentals"""
        all_rentals = self.rentals_repo.read_all()
        active_rentals = []
        for rental_dict in all_rentals:
            rental = Rental.from_dict(rental_dict)
            if rental.is_active:
                active_rentals.append(rental)
        return active_rentals

    def get_all_rentals(self) -> List[Rental]:
        """Get all active rentals"""
        rentals = self.rentals_repo.read_all()
        result = [Rental.from_dict(rental) for rental in rentals]
        return result
    