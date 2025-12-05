from fastapi import APIRouter, HTTPException, Body
from api.dependencies import client_service
from typing import List

from src.models.client import Client

#import schemas
from api.schemas.client import ClientResponse, ClientSchema, DeletedClientResponse
from api.schemas.response import ResponseModel

router = APIRouter()

@router.get("/clients", response_model=ResponseModel[List[ClientResponse]])
def get_clients() -> List[dict]:
    # deserialize the clients 
    clients = client_service.get_all_clients()
    data = [client.to_dict() for client in clients]
    return {
        "message": "success",
        "data": data
    }

@router.get("/clients/deleted", response_model=ResponseModel[List[DeletedClientResponse]])
def get_deleted_clients() -> List[dict]:
    # no need to deserialize cuz get_deleted_clients returns dict 
    data = client_service.get_deleted_clients()
    return {
        "message": "success",
        "data": data
    }
    
@router.get("/clients/{client_id}", response_model=ResponseModel[ClientResponse])
def get_single_client(client_id: str) -> dict:
    result = client_service.get_client(client_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found")
    data = result.to_dict()
    return {
        "message": "success",
        "data": data
    }

@router.post("/clients", response_model=dict)
def create_client(data: ClientSchema) -> dict:
    # create temp ID to avoid sending id to update 
    temp_client = Client("TEMP", data.name, data.email, data.phone)
    result = client_service.add_client(temp_client)
    if not result:
        raise HTTPException(status_code=400, detail="Something went wrong")
    data = result.to_dict()
    return {"message": "Client has been successfully added", "data": data}

@router.patch("/clients/{client_id}", response_model=dict)
def update_client(client_id: str, updated_fields: dict = Body(...)) -> dict:
    result = client_service.update_client(client_id, updated_fields)
    if not result:
        raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found")
    data = result.to_dict()
    return {
        "message": "success",
        "data": data
    }

@router.delete("/clients/{client_id}", response_model=dict)
def delete_client(client_id: str):
    result = client_service.delete_client(client_id)
    if not result:
        raise HTTPException(status_code=404, detail="Client not found")
    data = result.to_dict()
    return {
        "message": f"Client deleted successfully",
        "data": data
    }
