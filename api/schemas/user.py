from pydantic import BaseModel

class UserSchema(BaseModel):
    username: str   
    password: str

class UserResponse(UserSchema):
    id: str
    role: str