from fastapi import APIRouter, HTTPException, status

from src.models.user import User
from api.utils.data_utils import create_access_token

from api.schemas.response import ResponseModel

from api.schemas.user import UserSchema, UserResponse
from dependencies import auth_service

router = APIRouter()

@router.post("/signup", response_model=ResponseModel[bool])
def signup(data: UserSchema):
    temp_user = User("TEMP", data.username, data.password)
    success = auth_service.add_user(temp_user)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken or registration failed"
        )
    
    return {
        "message": "success",
        data: True
    }

@router.post("login")
def login(data: UserSchema):
    user = auth_service.authenticate(data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    access_token = create_access_token(
        data={"sub": user.id, "role": user.role}
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer"
    }