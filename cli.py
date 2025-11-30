import click
import logging
from datetime import datetime
from src.models.car import Car
from src.models.client import Client
from src.repositories.concrete_repository import JsonRepository
from src.repositories.constants import CAR_HISTORY_SIZE, CLIENT_HISTORY_SIZE, RENTAL_HISTORY_SIZE

# import services
from src.services.rental_service import RentalService
from src.services.car_service import CarService
from src.services.client_service import ClientService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cli")

# Initialize repositories and service
cars_repo = JsonRepository("data/cars.json", "vehicle_id", CAR_HISTORY_SIZE)
clients_repo = JsonRepository("data/clients.json", "client_id", CLIENT_HISTORY_SIZE)
rentals_repo = JsonRepository("data/rentals.json", "rental_id", RENTAL_HISTORY_SIZE)

car_service = CarService(cars_repo, rentals_repo)
client_service = ClientService(clients_repo)
rental_service = RentalService(rentals_repo, car_service, client_service)

@click.group()
def cli():
    """Car Rental Management CLI"""
    pass

# ------------------- CARS -------------------
@cli.group()
def car():
    """Manage cars"""
    pass

@car.command("list")
def list_cars():
    """List all available cars"""
    cars = car_service.get_available_cars()
    if not cars:
        click.echo("No cars available.")
        return
    for car in cars:
        click.echo(f"{car.vehicle_id} | {car.brand} {car.model} ({car.car_type}) - ${car.daily_rate}/day")

@car.command("add")
@click.option("--brand", prompt="Brand")
@click.option("--model", prompt="Model")
@click.option("--daily-rate", prompt="Daily Rate", type=float)
@click.option("--car-type", prompt="Car Type")
@click.option("--seats", prompt="Seats", type=int)
def add_car(brand, model, daily_rate, car_type, seats):
    """Add a new car"""
    car_obj = Car("TEMP", brand, model, daily_rate, car_type, seats)
    car_service.add_car(car_obj)
    click.echo(f"Car added: {brand} {model}")

@car.command("delete")
def delete_car():
    """Delete a car by selecting its brand/model"""
    cars = car_service.get_available_cars()
    if not cars:
        click.echo("No cars available to delete.")
        return

    for i, car in enumerate(cars, 1):
        click.echo(f"{i}. {car.brand} {car.model} ({car.car_type})")

    index = click.prompt("Select a car number to delete", type=int)

    if 1 <= index <= len(cars):
        vehicle_id = cars[index - 1].vehicle_id
        choice = f"{cars[index - 1].brand} {cars[index - 1].model} ({cars[index - 1].car_type})"
        if car_service.delete_car(vehicle_id):
            click.echo(f"Car '{choice}' deleted successfully")
        else:
            click.echo(f"Car '{choice}' could not be deleted (maybe it's rented)")
    else:
        click.echo("Invalid selection.")

# ------------------- CLIENTS -------------------
@cli.group()
def client():
    """Manage clients"""
    pass

@client.command("list")
def list_clients():
    """List all clients"""
    all_clients = clients_repo.read_all()
    if not all_clients:
        click.echo("No clients found.")
        return
    for client_data in all_clients:
        click.echo(f"{client_data['client_id']} | {client_data['name']} - {client_data['email']} - {client_data['phone']}")

@client.command("add")
@click.option("--name", prompt="Name")
@click.option("--email", prompt="Email")
@click.option("--phone", prompt="Phone")
def add_client(name, email, phone):
    """Add a new client"""
    client_obj = Client("TEMP", name, email, phone)
    client_service.add_client(client_obj)
    click.echo(f"Client added: {name}")

# ------------------- RENTALS -------------------
@cli.group()
def rental():
    """Manage rentals"""
    pass

@rental.command("create")
@click.argument("car_id")
@click.argument("client_id")
def create_rental(car_id, client_id):
    """Create a rental"""
    rental_obj = rental_service.create_rental(car_id, client_id)
    if rental_obj:
        click.echo(f"Rental created: {rental_obj.rental_id}")
    else:
        click.echo("Failed to create rental. Check car availability and client ID.")

@rental.command("complete")
@click.argument("rental_id")
def complete_rental(rental_id):
    """Complete a rental"""
    if rental_service.complete_rental(rental_id):
        click.echo(f"Rental {rental_id} completed.")
    else:
        click.echo(f"Failed to complete rental {rental_id}.")

@rental.command("list")
def list_rentals():
    """List active rentals"""
    rentals = rental_service.get_active_rentals()
    if not rentals:
        click.echo("No active rentals.")
        return
    for r in rentals:
        click.echo(f"{r.rental_id} | Car: {r.car.brand} {r.car.model} | Client: {r.client.name} | Start: {r.start_date}")

if __name__ == "__main__":
    cli()
