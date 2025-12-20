import pytest
from src.models.car import Car

@pytest.fixture
def car():
    return Car('C001', 'Toyota', 'Camry', 50.0, 'Sedan', 5)

@pytest.fixture
def suv_car():
    return Car('C002', 'Honda', 'CR-V', 70.0, 'SUV', 7)

# Inheritance
def test_inheritance(car):
    assert car.vehicle_id == 'C001'
    assert isinstance(car, Car)
    assert hasattr(car, 'brand')

# Polymorphism - əsas testlər
def test_polymorphism(car):
    assert car.calculate_rental_cost(3) == 150.0

def test_polymorphism_suv(suv_car):
    assert suv_car.calculate_rental_cost(3) == 252.0

def test_polymorphism_luxury():
    luxury = Car('C003', 'BMW', '7 Series', 150.0, 'Luxury', 5)
    assert luxury.calculate_rental_cost(2) == 300.0

# Polymorphism - edge cases
def test_zero_days(car):
    assert car.calculate_rental_cost(0) == 0.0

def test_negative_days(car):
    assert car.calculate_rental_cost(-5) == -250.0

def test_float_days(car):
    assert car.calculate_rental_cost(2.5) == 125.0

# Encapsulation
def test_encapsulation(car):
    assert car.is_available
    car.is_available = False
    assert not car.is_available

def test_availability_toggle():
    car = Car('C004', 'Ford', 'Focus', 40.0, 'Economy', 5, is_available=False)
    assert not car.is_available
    car.is_available = True
    assert car.is_available

# Serialization
def test_to_dict(car):
    d = car.to_dict()
    assert d['vehicle_id'] == 'C001'
    assert d['brand'] == 'Toyota'
    assert d['car_type'] == 'Sedan'
    assert d['seats'] == 5

def test_to_dict_unavailable():
    car = Car('C005', 'Audi', 'A4', 80.0, 'Sedan', 5, is_available=False)
    assert car.to_dict()['is_available'] is False

# Deserialization
def test_from_dict():
    d = {'vehicle_id': 'C006', 'brand': 'BMW', 'model': '320i', 
         'daily_rate': 100.0, 'car_type': 'Sedan', 'seats': 5, 'is_available': True}
    car = Car.from_dict(d)
    assert car.vehicle_id == 'C006'
    assert car.brand == 'BMW'

def test_from_dict_missing_availability():
    d = {'vehicle_id': 'C007', 'brand': 'Tesla', 'model': 'Model 3',
         'daily_rate': 90.0, 'car_type': 'Sedan', 'seats': 5}
    car = Car.from_dict(d)
    assert car.is_available is True

# Round-trip
def test_round_trip(car):
    new_car = Car.from_dict(car.to_dict())
    assert new_car.vehicle_id == car.vehicle_id
    assert new_car.brand == car.brand
    assert new_car.is_available == car.is_available

# Edge cases
def test_empty_strings():
    with pytest.raises(ValueError):
        Car('', '', '', 50.0, '', 5)

def test_special_chars():
    car = Car('C-001', "O'Brien", 'X-1', 50.0, 'Sedan', 5)
    assert car.vehicle_id == 'C-001'

def test_high_values():
    car = Car('C008', 'Luxury', 'Super', 10000.0, 'Luxury', 2)
    assert car.calculate_rental_cost(5) == 50000.0

def test_large_rental(car):
    # long-term discount of 15% applies for rentals >= 7 days
    assert car.calculate_rental_cost(365) == 15512.5