from src.repositories.concrete_repository import JsonRepository
from src.repositories.concrete_repo import PostgresRepository
from src.repositories.constants import CAR_HISTORY_SIZE, CLIENT_HISTORY_SIZE, RENTAL_HISTORY_SIZE

# import services
from src.services.rental_service import RentalService
from src.services.car_service import CarService
from src.services.client_service import ClientService

# Initialize repositories
cars_repo = PostgresRepository("vehicle_id", "cars", CAR_HISTORY_SIZE)
clients_repo = PostgresRepository("client_id", "clients", CLIENT_HISTORY_SIZE)
rentals_repo = PostgresRepository("rental_id", "rentals", RENTAL_HISTORY_SIZE)

# Initialize service layer
car_service = CarService(cars_repo, rentals_repo)
client_service = ClientService(clients_repo)
rental_service = RentalService(rentals_repo, car_service, client_service)
