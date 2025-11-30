from pydantic import BaseModel
from datetime import datetime

class ClientSchema(BaseModel):
    name: str   
    email: str
    phone: str

class ClientResponse(BaseModel):
    client_id: str
    name: str  
    email: str
    phone: str

class DeletedClientSchema(ClientSchema):
    deletion_date: datetime