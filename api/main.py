from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.routes import cars, clients, rentals, dashboard, auth
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",  
    "http://127.0.0.1",
    "http://192.168.100.184",
    "http://localhost:5173"
]

app = FastAPI(title="Car Rental API")

app.mount("/media", StaticFiles(directory="media"), name="media")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],    
)

app.include_router(cars.router)
app.include_router(clients.router)
app.include_router(rentals.router)
app.include_router(dashboard.router)
app.include_router(auth.router)

