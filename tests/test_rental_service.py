from datetime import datetime

import pytest

from src.models.car import Car
from src.models.client import Client
from src.repositories.concrete_repository import JsonRepository
from src.services.car_service import CarService
from src.services.client_service import ClientService
from src.services.rental_service import RentalService


@pytest.fixture
def cars_repo(tmp_path):
    file_path = tmp_path / "cars.json"
    repo = JsonRepository(str(file_path), id_field="vehicle_id")
    repo._save_deleted_history = lambda: None

    class RepoShim:
        def __init__(self, inner):
            self._inner = inner
        def read(self, item_id):
            return self._inner.find_by_id(item_id)
        def __getattr__(self, name):
            return getattr(self._inner, name)

    return RepoShim(repo)


@pytest.fixture
def clients_repo(tmp_path):
    file_path = tmp_path / "clients.json"
    repo = JsonRepository(str(file_path), id_field="client_id")
    repo._save_deleted_history = lambda: None

    class RepoShim:
        def __init__(self, inner):
            self._inner = inner
        def read(self, item_id):
            return self._inner.find_by_id(item_id)
        def __getattr__(self, name):
            return getattr(self._inner, name)

    return RepoShim(repo)


@pytest.fixture
def rentals_repo(tmp_path):
    file_path = tmp_path / "rentals.json"
    repo = JsonRepository(str(file_path), id_field="rental_id")
    repo._save_deleted_history = lambda: None

    class RepoShim:
        def __init__(self, inner):
            self._inner = inner
        def read(self, item_id):
            return self._inner.find_by_id(item_id)
        def __getattr__(self, name):
            return getattr(self._inner, name)

    return RepoShim(repo)


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
def seeded_car_and_client(car_service, client_service):
    car = car_service.add_car(Car("TEMP", "Toyota", "Camry", 50.0, "Sedan", 5))
    client = client_service.add_client(
        Client("TEMP", "John Doe", "john@example.com", "123")
    )
    return car, client


def test_create_rental_success(rental_service, seeded_car_and_client):
    car, client = seeded_car_and_client
    rental = rental_service.create_rental(car.vehicle_id, client.client_id)
    assert rental is not None
    assert rental.car.vehicle_id == car.vehicle_id
    assert rental.client.client_id == client.client_id

    # car should be marked unavailable
    updated_car = rental_service.car_service.get_car(car.vehicle_id)
    assert updated_car is not None
    assert updated_car.is_available is False


def test_create_rental_invalid_car(rental_service, seeded_car_and_client):
    _, client = seeded_car_and_client
    rental = rental_service.create_rental("NON_EXISTENT", client.client_id)
    assert rental is None


def test_create_rental_invalid_client(rental_service, seeded_car_and_client):
    car, _ = seeded_car_and_client
    rental = rental_service.create_rental(car.vehicle_id, "NON_EXISTENT")
    assert rental is None


def test_complete_rental_updates_state(rental_service, seeded_car_and_client):
    car, client = seeded_car_and_client
    start_date = datetime(2024, 1, 1)
    rental = rental_service.create_rental(
        car.vehicle_id, client.client_id, start_date=start_date
    )
    assert rental is not None

    end_date = datetime(2024, 1, 10)
    completed = rental_service.complete_rental(rental.rental_id, end_date=end_date)
    assert completed is not False
    assert completed.is_active is False
    assert completed.end_date == end_date

    # car should be available again
    updated_car = rental_service.car_service.get_car(car.vehicle_id)
    assert updated_car is not None
    assert updated_car.is_available is True


def test_get_active_and_all_rentals(rental_service, seeded_car_and_client):
    car, client = seeded_car_and_client
    start_date = datetime(2024, 1, 1)
    rental1 = rental_service.create_rental(
        car.vehicle_id, client.client_id, start_date=start_date
    )
    assert rental1 is not None

    active = rental_service.get_active_rentals()
    assert any(r.rental_id == rental1.rental_id for r in active)

    # complete the rental
    rental_service.complete_rental(
        rental1.rental_id, end_date=datetime(2024, 1, 5)
    )

    active_after = rental_service.get_active_rentals()
    assert all(r.rental_id != rental1.rental_id for r in active_after)

    all_rentals = rental_service.get_all_rentals()
    assert any(r.rental_id == rental1.rental_id for r in all_rentals)


