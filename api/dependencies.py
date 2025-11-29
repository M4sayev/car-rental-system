from src.repositories.concrete_repository import JsonRepository
from src.repositories.constants import CAR_HISTORY_SIZE, CLIENT_HISTORY_SIZE, RENTAL_HISTORY_SIZE
from src.services.rental_service import RentalService

# Initialize repositories
cars_repo = JsonRepository("data/cars.json", "vehicle_id", CAR_HISTORY_SIZE)
clients_repo = JsonRepository("data/clients.json", "client_id", CLIENT_HISTORY_SIZE)
rentals_repo = JsonRepository("data/rentals.json", "rental_id", RENTAL_HISTORY_SIZE)

# Initialize service layer
service = RentalService(cars_repo, clients_repo, rentals_repo)
