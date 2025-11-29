import pytest
from datetime import datetime
from src.models.car import Car
from src.models.client import Client
from src.models.rental import Rental

@pytest.fixture
def rental_setup():
    car = Car('C001', 'Toyota', 'Camry', 50.0, 'Sedan', 5)
    client = Client('CL001', 'John Doe', 'john@example.com', '+1234567890')
    rental = Rental('R001', car, client, datetime(2024, 1, 1))
    return rental, car, client

# Composition
def test_composition(rental_setup):
    rental, car, client = rental_setup
    assert rental.car.vehicle_id == 'C001'
    assert rental.client.client_id == 'CL001'

# Cost calculation
def test_calculate_total_cost(rental_setup):
    rental, _, _ = rental_setup
    rental.end_date = datetime(2024, 1, 4)
    assert rental.calculate_total_cost() == 150.0

def test_calculate_cost_suv():
    car = Car('C002', 'Honda', 'CR-V', 70.0, 'SUV', 7)
    client = Client('CL002', 'Jane', 'jane@test.com', '123')
    rental = Rental('R002', car, client, datetime(2024, 2, 1))
    rental.end_date = datetime(2024, 2, 4)
    assert rental.calculate_total_cost() == 252.0

def test_calculate_cost_no_end_date(rental_setup):
    rental, _, _ = rental_setup
    cost = rental.calculate_total_cost()
    assert cost == 0.0 or cost is None

def test_calculate_cost_same_day(rental_setup):
    rental, _, _ = rental_setup
    rental.end_date = datetime(2024, 1, 1)
    assert rental.calculate_total_cost() == 0.0

# Complete rental
def test_complete_rental(rental_setup):
    rental, car, _ = rental_setup
    assert rental.is_active
    rental.complete_rental()
    assert not rental.is_active
    assert car.is_available

def test_complete_rental_sets_end_date(rental_setup):
    rental, _, _ = rental_setup
    rental.complete_rental()
    assert rental.end_date is not None

# Serialization
def test_to_dict(rental_setup):
    rental, _, _ = rental_setup
    d = rental.to_dict()
    assert d['rental_id'] == 'R001'
    assert d['car']['vehicle_id'] == 'C001'
    assert d['is_active'] is True

# Deserialization
def test_from_dict():
    d = {
        'rental_id': 'R003',
        'car': {'vehicle_id': 'C003', 'brand': 'BMW', 'model': '320i',
                'daily_rate': 100.0, 'car_type': 'Sedan', 'seats': 5, 'is_available': False},
        'client': {'client_id': 'CL003', 'name': 'Bob', 
                   'email': 'bob@test.com', 'phone': '123'},
        'start_date': '2024-03-01T00:00:00',
        'end_date': None,
        'is_active': True
    }
    rental = Rental.from_dict(d)
    assert rental.rental_id == 'R003'

# Round-trip
def test_round_trip(rental_setup):
    rental, _, _ = rental_setup
    new_rental = Rental.from_dict(rental.to_dict())
    assert new_rental.rental_id == rental.rental_id
    assert new_rental.is_active == rental.is_active

# Edge cases
def test_empty_rental_id():
    car = Car('C004', 'Ford', 'Focus', 40.0, 'Sedan', 5)
    client = Client('CL004', 'Test', 'test@test.com', '123')
    rental = Rental('', car, client, datetime(2024, 1, 1))
    assert rental.rental_id == ''