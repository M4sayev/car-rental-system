from typing import List, Optional
from src.models.car import Car
from src.repositories.base_repo import Repository
from src.utils.entity import generate_id
import logging
import os

logger = logging.getLogger(__name__)

class CarService:
    def __init__(self, cars_repo: Repository, rentals_repo: Repository):
        self.cars_repo = cars_repo
        self.rentals_repo = rentals_repo
    
    def add_car(self, car: Car) -> Car | bool:
        """Add a new car to the system"""
        # Set the id dynamically
        car_id = generate_id()
        car = Car(car_id, car.brand, car.model, car.daily_rate, car.car_type, car.seats, car.is_available, car.image_url)
        car_dict = car.to_dict()
        if self.cars_repo.create(car_dict, "cars"):
            return car
        return False

    def get_car(self, vehicle_id: str) -> Optional[Car]:
        """Get car by ID"""
        car_dict = self.cars_repo.find_by_id(vehicle_id)
        if car_dict:
            return Car.from_dict(car_dict)
        return None
    
    def get_cars_by_ids(self, ids: str) -> List[Car]:
        """Get all id matching cars"""
        cars = self.cars_repo.get_by_ids("cars", ids)
        return [Car.from_dict(car) for car in cars]
    
    def update_car(self, vehicle_id: str, updated_fields: dict) -> Car | bool:
        """Update car by ID"""
        car = self.cars_repo.update(vehicle_id, updated_fields)
        if not car:
            return False
        return Car.from_dict(car)
    
    def delete_car(self, vehicle_id: str) -> Car | bool:
        """Delete car by ID, and the image if provided"""
        # Warn if the car is currently rented 
        active_rentals = self.rentals_repo.read_all("rentals")

        for rental in active_rentals:
            print(f"RENTAL: {rental}")
            if rental["car_id"] == vehicle_id and rental.get("is_active", True):
                logger.warning(f"Cannot delete car {vehicle_id}, it is currently rented.")
                return False

        car = self.cars_repo.delete(vehicle_id)
        if not car:
            return False
            
        # set the image of the car to unavailable
        self.update_car(vehicle_id, updated_fields={"image_url": "/media/cars/car_default.jpg", "is_available": False})
        
        image_url = car["image_url"]
        if image_url and not image_url.endswith("car_default.jpg"):
            try:
                file_path = os.path.join("media/cars", os.path.basename(image_url))
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception as e:
                logger.error(f"Failed to delete image {image_url}: {e}")

        return Car.from_dict(car)

    def get_available_cars(self) -> List[Car]:
        """Get all available cars"""
        all_cars = self.cars_repo.read_all("cars")
        available_cars = []
        for car_dict in all_cars:
            car = Car.from_dict(car_dict)
            if car.is_available:
                available_cars.append(car)
        return available_cars
    
    def get_cars(self) -> List[Car]:
        """Get all cars"""
        all_cars = self.cars_repo.read_all("cars")
        cars = [Car.from_dict(car) for car in all_cars]
        return cars 
    
  
    
    def calculate_rental_cost(self,vehicle_id: str, days: int) -> Optional[float]:
        """Calculate rental cost based on the strategy"""
        car = self.get_car(vehicle_id)
        if not car:
            return None
        return car.calculate_rental_cost(days)
    
    def get_deleted_cars(self) -> List[dict]:
        """Get a list of deleted cars"""
        deleted_cars = self.cars_repo.get_deleted_history()
        return deleted_cars



