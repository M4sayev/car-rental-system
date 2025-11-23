"""
Car Rental Management System - Main Entry Point
Sprint 1 - OOP Implementation
"""

from datetime import datetime
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.models.car import Car
from src.models.client import Client
from src.repositories.repository import Repository
from src.services.rental_service import RentalService
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def main():
    """Main function to demonstrate the system"""
    logger.info("Starting Car Rental Management System...")

    # Initialize repositories
    cars_repo = Repository('data/cars.json')
    clients_repo = Repository('data/clients.json')
    rentals_repo = Repository('data/rentals.json')

    # Initialize service
    service = RentalService(cars_repo, clients_repo, rentals_repo)

    # Example: Add some cars
    logger.info("Adding sample cars...")
    car1 = Car('C001', 'Toyota', 'Camry', 50.0, 'Sedan', 5)
    car2 = Car('C002', 'Honda', 'CR-V', 70.0, 'SUV', 7)
    car3 = Car('C003', 'BMW', '320i', 100.0, 'Sedan', 5)

    service.add_car(car1)
    service.add_car(car2)
    service.add_car(car3)

    # Example: Add clients
    logger.info("Adding sample clients...")
    client1 = Client('CL001', 'John Doe', 'john@example.com', '+1234567890')
    client2 = Client('CL002', 'Jane Smith', 'jane@example.com', '+0987654321')

    service.add_client(client1)
    service.add_client(client2)

    # Example: Create rental
    logger.info("Creating rental...")
    rental = service.create_rental('R001', 'C001', 'CL001')
    if rental:
        logger.info(f"Rental created: {rental.rental_id}")
        logger.info(f"Car: {rental.car.brand} {rental.car.model}")
        logger.info(f"Client: {rental.client.name}")

    # Example: Get available cars
    logger.info("Available cars:")
    available_cars = service.get_available_cars()
    for car in available_cars:
        logger.info(f"  - {car.brand} {car.model} ({car.car_type}) - ${car.daily_rate}/day")

    logger.info("System demonstration completed!")


if __name__ == '__main__':
    main()