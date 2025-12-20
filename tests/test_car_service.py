import pytest

from src.models.car import Car
from src.repositories.concrete_repository import JsonRepository
from src.services.car_service import CarService


@pytest.fixture
def cars_repo(tmp_path):
    file_path = tmp_path / "cars.json"
    # JsonRepository will ensure the file exists
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


def test_add_and_get_car(car_service):
    base_car = Car("TEMP", "Toyota", "Corolla", 40.0, "Sedan", 5)
    created = car_service.add_car(base_car)
    assert isinstance(created, Car)

    # It should be retrievable by its generated id
    fetched = car_service.get_car(created.vehicle_id)
    assert fetched is not None
    assert fetched.vehicle_id == created.vehicle_id
    assert fetched.brand == "Toyota"


def test_get_available_cars_only_returns_available(car_service):
    car1 = car_service.add_car(Car("TEMP", "Toyota", "Corolla", 40.0, "Sedan", 5))
    car2 = car_service.add_car(Car("TEMP", "BMW", "X5", 120.0, "SUV", 5))
    # mark the second one unavailable in the repo
    car2.is_available = False
    car_service.cars_repo.update(
        car2.vehicle_id,
        {  # minimal update dict
            "brand": car2.brand,
            "model": car2.model,
            "daily_rate": car2.daily_rate,
            "car_type": car2.car_type,
            "seats": car2.seats,
            "is_available": car2.is_available,
        },
    )

    available = car_service.get_available_cars()
    ids = {c.vehicle_id for c in available}
    assert car1.vehicle_id in ids
    assert car2.vehicle_id not in ids


def test_calculate_rental_cost_uses_car_pricing(car_service):
    car = car_service.add_car(Car("TEMP", "Toyota", "Corolla", 50.0, "Sedan", 5))
    cost = car_service.calculate_rental_cost(car.vehicle_id, 3)
    assert cost == pytest.approx(150.0)


def test_delete_car_fails_when_rented(car_service):
    # create a car and an active rental referencing it directly in rentals_repo
    car = car_service.add_car(Car("TEMP", "Toyota", "Corolla", 40.0, "Sedan", 5))
    rental_dict = {
        "rental_id": "R1",
        "car": car.to_dict(),
        "client": {
            "client_id": "CL1",
            "name": "Test",
            "email": "a@b.com",
            "phone": "123",
        },
        "start_date": "2024-01-01T00:00:00",
        "end_date": None,
        "total_cost": 0.0,
        "is_active": True,
    }
    car_service.rentals_repo.create(rental_dict)

    result = car_service.delete_car(car.vehicle_id)
    assert result is False


def test_delete_car_succeeds_when_not_rented(car_service):
    car = car_service.add_car(Car("TEMP", "Toyota", "Corolla", 40.0, "Sedan", 5))
    deleted = car_service.delete_car(car.vehicle_id)
    assert isinstance(deleted, Car)
    assert car_service.get_car(car.vehicle_id) is None


