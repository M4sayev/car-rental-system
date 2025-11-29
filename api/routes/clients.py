from fastapi import FastAPI, HTTPException
from api.dependencies import service
from typing import List

from src.models.client import Client

from pydantic import BaseModel

app = FastAPI()

# Client schema
class ClientSchema(BaseModel):
    name: str   
    email: str
    phone: str

@app.get("/clients", response_model=List[dict])
def get_clients() -> List[dict]:
    # deserialize the clients 
    clients = service.get_all_clients()
    data = [client.to_dict() for client in clients]
    return {
        "message": "success",
        "data": data
    }
    
@app.get("/clients/{client_id}", response_model=dict)
def get_single_client(client_id: str) -> dict:
    result = service.get_client(client_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found")
    data = result.to_dict()
    return {
        "message": "success",
        "data": data
    }

@app.post("/clients", response_model=dict)
def create_client(data: ClientSchema) -> dict:
    # create temp ID to avoid sending id to update 
    temp_client = Client("TEMP", data.name, data.email, data.phone)
    result = service.add_client(temp_client)
    if not result:
        raise HTTPException(status_code=400, detail="Something went wrong")
    data = result.to_dict()
    return {"message": "Client has been successfully added", "data": data}

@app.delete("/clients/{client_id}", response_model=dict)
def delete_client(client_id: str):
    result = service.delete_client(client_id)
    if not result:
        raise HTTPException(status_code=404, detail="Client not found")
    data = result.to_dict()
    return {
        "message": f"Client deleted successfully",
        "data": data
    }
