from pydantic import BaseModel
from datetime import datetime

class ClientSchema(BaseModel):
    name: str   
    email: str
    phone: str

class ClientResponse(ClientSchema):
    client_id: str

class DeletedClientSchema(ClientSchema):
    deletion_date: datetime

class DeletedClientResponse(ClientResponse):
    deletion_date: datetime