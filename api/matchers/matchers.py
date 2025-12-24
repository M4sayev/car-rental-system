# helper function to check if the search is matched in a rental
from api.types.types import Rental, Client, Car

def client_matches(client: Client, search: str) -> bool:
    return (
        search in client.name.lower() or
        search in client.email.lower() or
        search in client.client_id.lower()
    )

def car_matches(car: Car, search: str) -> bool:
    return (
        search in car.vehicle_id.lower() or
        search in car.brand.lower() or
        search in str(car.daily_rate) or 
        search in car.model.lower()
    )

def rental_matches(rental: Rental, search: str) -> bool:
    return (
        search in rental.rental_id.lower()
        or search in rental.car.brand.lower()
        or search in rental.car.model.lower()
        or search in rental.client.name.lower()
    )