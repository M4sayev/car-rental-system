from fastapi import FastAPI
from api.routes import cars, clients, rentals

app = FastAPI(title="Car Rental API")

app.include_router(cars.router)
app.include_router(clients.router)
app.include_router(rentals.router)