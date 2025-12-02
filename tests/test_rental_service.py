import pytest
from datetime import datetime
from src.models.car import Car
from src.models.client import Client
from src.repositories.concrete_repository import JsonRepository
from src.services.car_service import CarService
from src.services.client_service import ClientService
from src.services.rental_service import RentalService


@pytest.fixture
def cars_repo(tmp_path):
    return JsonRepository(str(tmp_path / "cars.json"), id_field="vehicle_id")

@pytest.fixture
def clients_repo(tmp_path):
    return JsonRepository(str(tmp_path / "clients.json"), id_field="client_id")

@pytest.fixture
def rentals_repo(tmp_path):
    return JsonRepository(str(tmp_path / "rentals.json"), id_field="rental_id")

@pytest.fixture
def car_service(cars_repo, rentals_repo):
    return CarService(cars_repo, rentals_repo)

@pytest.fixture
def client_service(clients_repo):
    return ClientService(clients_repo)

@pytest.fixture
def rental_service(rentals_repo, car_service, client_service):
    return RentalService(rentals_repo, car_service, client_service)

@pytest.fixture
def setup_data(car_service, client_service):
    car = car_service.add_car(Car("T", "Toyota", "Camry", 50.0, "Sedan", 5))
    client = client_service.add_client(Client("T", "John Doe", "john@example.com", "1234567890"))
    return car, client


def test_create_rental(rental_service, setup_data):
    car, client = setup_data
    rental = rental_service.create_rental(car.vehicle_id, client.client_id)
    
    assert rental is not None and rental.is_active
    assert rental.car.vehicle_id == car.vehicle_id
    assert rental_service.car_service.get_car(car.vehicle_id).is_available is False
    assert rental_service.create_rental("INVALID", client.client_id) is None
    assert rental_service.create_rental(car.vehicle_id, "INVALID") is None

def test_complete_rental(rental_service, setup_data):
    car, client = setup_data
    rental = rental_service.create_rental(car.vehicle_id, client.client_id, start_date=datetime(2024, 1, 1))
    
    completed = rental_service.complete_rental(rental.rental_id, end_date=datetime(2024, 1, 10))
    assert completed.is_active is False and completed.end_date == datetime(2024, 1, 10)
    assert rental_service.car_service.get_car(car.vehicle_id).is_available is True
    assert rental_service.complete_rental("INVALID", datetime(2024, 1, 10)) is False

def test_get_rentals(rental_service, setup_data):
    car, client = setup_data
    assert rental_service.get_all_rentals() == []
    assert rental_service.get_active_rentals() == []
    
    rental = rental_service.create_rental(car.vehicle_id, client.client_id)
    assert len(rental_service.get_active_rentals()) == 1
    assert rental_service.get_rental(rental.rental_id).rental_id == rental.rental_id
    assert rental_service.get_rental("INVALID") is None
    
    rental_service.complete_rental(rental.rental_id, datetime(2024, 1, 5))
    assert len(rental_service.get_active_rentals()) == 0
    assert len(rental_service.get_all_rentals()) == 1

def test_get_client_rentals(rental_service, setup_data):
    car, client = setup_data
    rental = rental_service.create_rental(car.vehicle_id, client.client_id)
    
    client_rentals = rental_service.get_client_rentals(client.client_id)
    assert len(client_rentals) == 1 and client_rentals[0].rental_id == rental.rental_id
    assert rental_service.get_client_rentals("INVALID") == []

def test_calculate_cost(rental_service, setup_data):
    car, client = setup_data
    rental = rental_service.create_rental(car.vehicle_id, client.client_id, start_date=datetime(2024, 1, 1))
    
    cost = rental_service.calculate_rental_cost(rental.rental_id, datetime(2024, 1, 10))
    assert cost == 450.0  # 9 days * 50.0
    assert rental_service.calculate_rental_cost("INVALID", datetime(2024, 1, 10)) is None