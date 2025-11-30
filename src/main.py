"""
Car Rental Management System - Main Entry Point
Sprint 1 - OOP Implementation
"""

import sys
import os

# Fix import path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.models.car import Car
from src.models.client import Client

# import business layer 
from src.services.rental_service import RentalService
from src.services.car_service import CarService
from src.services.client_service import ClientService

from src.repositories.constants import CAR_HISTORY_SIZE, CLIENT_HISTORY_SIZE, RENTAL_HISTORY_SIZE
from src.repositories.concrete_repository import JsonRepository
import logging

# to test validation (for the dev only)
from src.validation_test import test_validation 

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("src.main")

def seed_data(rental_service: RentalService, car_service: CarService, client_service: ClientService, rentals_repo, cars_repo, clients_repo):
    """Insert sample data only if JSON files are empty."""
    
    # ---------------- CARS -------------------
    if not cars_repo.read_all():
        logger.info("Seeding sample cars...")
        car_service.add_car(Car("Toyota", "Camry", 50.0, "Sedan", 5))
        car_service.add_car(Car("Honda", "CR-V", 70.0, "SUV", 7))
        car_service.add_car(Car("BMW", "320i", 100.0, "Sedan", 5))

    # ---------------- CLIENTS ----------------
    if not clients_repo.read_all():
        logger.info("Seeding sample clients...")
        client_service.add_client(Client("John Doe", "john@example.com", "+1234567890"))
        client_service.add_client(Client("Jane Smith", "jane@example.com", "+0987654321"))

    # ---------------- RENTALS ----------------
    if not rentals_repo.read_all():
        logger.info("Creating initial rental...")
        rental_service.create_rental("C001", "CL001")  # Rents car C001


def main():
    logger.info("Starting Car Rental Management System...")

    # Initialize repositories
    cars_repo = JsonRepository("data/cars.json", "vehicle_id", CAR_HISTORY_SIZE)
    clients_repo = JsonRepository("data/clients.json", "client_id", CLIENT_HISTORY_SIZE)
    rentals_repo = JsonRepository("data/rentals.json", "rental_id", RENTAL_HISTORY_SIZE)

    # Initialize service layer
    car_service = CarService(cars_repo, rentals_repo)
    client_service = ClientService(clients_repo)
    rental_service = RentalService(rentals_repo, car_service, client_service)
    # Seed initial data only once
    seed_data(rental_service, car_service, client_service, rentals_repo, cars_repo, clients_repo)

    # Display available cars
    logger.info("Available cars:")
    for car in car_service.get_available_cars():
        logger.info(f" - {car.brand} {car.model} ({car.car_type}) - ${car.daily_rate}/day")

    logger.info("System demonstration completed!")


if __name__ == "__main__":
    main()
