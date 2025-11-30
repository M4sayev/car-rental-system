from pydantic import BaseModel

class ClientSchema(BaseModel):
    name: str   
    email: str
    phone: str

class ClientResponse(BaseModel):
    client_id: str
    name: str  
    email: str
    phone: str