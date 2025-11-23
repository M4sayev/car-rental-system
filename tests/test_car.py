import pytest
from src.models.car import Car

@pytest.fixture
def car():
    return Car('C001', 'Toyota', 'Camry', 50.0, 'Sedan', 5)

def test_inheritance(car):
    """Inheritance testi"""
    assert car.vehicle_id == 'C001'
    assert isinstance(car, Car)

def test_polymorphism(car):
    """Polymorphism testi"""
    cost = car.calculate_rental_cost(3)
    assert cost == 150.0

def test_polymorphism_suv():
    """Polymorphism testi - SUV üçün əlavə ödəniş"""
    suv_car = Car('C002', 'Honda', 'CR-V', 70.0, 'SUV', 7)
    cost = suv_car.calculate_rental_cost(3)
    assert cost == 252.0  # 70 * 3 * 1.2

def test_encapsulation(car):
    """Encapsulation testi"""
    assert car.is_available
    car.is_available = False
    assert not car.is_available

def test_to_dict(car):
    """Serialization testi"""
    car_dict = car.to_dict()
    assert car_dict['vehicle_id'] == 'C001'
    assert car_dict['brand'] == 'Toyota'
    assert car_dict['car_type'] == 'Sedan'

def test_from_dict():
    """Deserialization testi"""
    car_dict = {
        'vehicle_id': 'C003',
        'brand': 'BMW',
        'model': '320i',
        'daily_rate': 100.0,
        'car_type': 'Sedan',
        'seats': 5,
        'is_available': True
    }
    car = Car.from_dict(car_dict)
    assert car.vehicle_id == 'C003'
    assert car.brand == 'BMW'