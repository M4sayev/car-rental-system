from datetime import datetime
from typing import List, Optional
from src.models.rental import Rental
from src.repositories.base_repo import Repository
from src.services.car_service import CarService 
from src.services.client_service import ClientService
from src.models.car import Car
from src.models.client import Client
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
        """Generate random id"""
        return str(uuid.uuid4())
    

    def delete_rental(self, rental_id: str) -> Rental | bool:
        """Delete an existing rental and update car availability"""
        deleted_rental = self.rentals_repo.delete(rental_id)
        if not deleted_rental:
            logger.error(f"Rental not found: {rental_id}")
            return False
        

        # set the car's availability to True
        car = self.car_service.get_car(deleted_rental["car_id"])
        car_dict  = car.to_dict()
        vehicle_id = car_dict.get("vehicle_id")

        self.car_service.update_car(vehicle_id, {"is_available": True})

        return Rental.from_db(deleted_rental)

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

        # Save rental
        rental = Rental(rental_id, car, client, start_date)
        rental_dict = rental.to_db()

        if self.rentals_repo.create(rental_dict, "rentals"):
             # Update car availability in repository if successfully created
            self.car_service.update_car(car_id, {"is_available": False})

            return rental
        return None
    
    def complete_rental(self, rental_id: str, end_date: Optional[datetime] = None) -> bool | Rental:
        """Complete a rental and make car available again"""
        rental_dict = self.rentals_repo.find_by_id(rental_id)
        if not rental_dict:
            logger.error(f"Rental not found: {rental_id}")
            return False

        # Update car availability
        vehicle_id = rental_dict["car_id"]
        self.car_service.update_car(vehicle_id, {"is_available": True})

        # Get the related objects
        client_id = rental_dict["client_id"]
        car = self.car_service.get_car(vehicle_id)
        client = self.client_service.get_client(client_id)

        rental = Rental(rental_id, car, client, start_date=rental_dict["start_date"], end_date=end_date)
        
        rental.complete_rental(end_date)

        updated_fields = {
            "is_active": rental.is_active,
            "end_date": rental.end_date,
            "total_cost": rental.total_cost
        }

        result = self.rentals_repo.update(rental_id, updated_fields)
        if not result:
            return False
        return rental
    
    def _hydrate_rentals(self, rentals_raw: List[dict]) -> List[Rental]:
        """Helper to turn raw DB rows into rich Rental objects."""
        if not rentals_raw:
            return []
        
        car_ids = list({r["car_id"] for r in rentals_raw})
        client_ids = list({r["client_id"] for r in rentals_raw})

        # bulk fetch
        cars_list = self.car_service.get_cars_by_ids(car_ids)
        clients_list = self.client_service.get_clients_by_ids(client_ids)

        # hashmaps for lookups
        car_map = {car["vehicle_id"]: car for car in cars_list}
        client_map = {client["client_id"]: client for client in clients_list}

        result = []
        for rental_dict in rentals_raw:
            car = car_map.get(rental_dict["car_id"])
            client = client_map.get(rental_dict["client_id"])

            if car and client:
                rental = Rental(
                    rental_id=rental_dict["rental_id"],
                    car=Car.from_dict(car),
                    client=Client.from_dict(client),
                    start_date=rental_dict["start_date"],
                    end_date=rental_dict.get("end_date")
                )
                result.append(rental)

        return result


    def get_active_rentals(self) -> List[Rental]:
        """Get all active rentals"""
        all_rentals = self.rentals_repo.read_all("rentals")
        active_rentals_raw = [rental for rental in all_rentals if rental.get("is_active")]
        return self._hydrate_rentals(active_rentals_raw)

    def get_all_rentals(self) -> List[Rental]:
        """Get all active rentals"""
        rentals_raw = self.rentals_repo.read_all("rentals")
        return self._hydrate_rentals(rentals_raw)
    

    