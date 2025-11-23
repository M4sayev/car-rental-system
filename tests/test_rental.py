import pytest
from datetime import datetime
from models.car import Car
from models.client import Client
from models.rental import Rental

@pytest.fixture
def rental_setup():
    car = Car('C001', 'Toyota', 'Camry', 50.0, 'Sedan', 5)
    client = Client('CL001', 'John Doe', 'john@example.com', '+1234567890')
    start_date = datetime(2024, 1, 1)
    rental = Rental('R001', car, client, start_date)
    return rental, car, client

def test_composition(rental_setup):
    """Composition testi"""
    rental, car, client = rental_setup
    assert rental.car.vehicle_id == 'C001'
    assert rental.client.client_id == 'CL001'

def test_calculate_total_cost(rental_setup):
    """Rental cost calculation testi"""
    rental, _, _ = rental_setup
    rental.end_date = datetime(2024, 1, 4)  # 3 days
    cost = rental.calculate_total_cost()
    assert cost == 150.0  # 50 * 3

def test_complete_rental(rental_setup):
    """Complete rental testi"""
    rental, car, _ = rental_setup
    assert rental.is_active
    assert car.is_available

    rental.complete_rental()
    assert not rental.is_active
    assert car.is_available  # Car should be available again