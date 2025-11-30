from typing import List, Optional
from src.models.car import Car
from src.repositories.base_repository import Repository
import uuid
import logging

logger = logging.getLogger(__name__)
class CarService:
    def __init__(self, cars_repo: Repository, rentals_repo: Repository):
        self.cars_repo = cars_repo
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
    
    def delete_car(self, vehicle_id: str) -> Car | bool:
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
    
    def calculate_rental_cost(self,vehicle_id: str, days: int) -> Optional[float]:
        car = self.get_car(vehicle_id)
        if not car:
            return None
        return car.calculate_rental_cost(days)



