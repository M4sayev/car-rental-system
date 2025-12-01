from pydantic import BaseModel
from typing import List, Optional, Generic, TypeVar

T = TypeVar("T")

class ResponseModel(BaseModel, Generic[T]):
    message: str
    data: Optional[T]