from api.types.types import EntityType
from typing import List
from collections.abc import Callable
import os
from datetime import datetime, timedelta, timezone
from jose import jwt

def deserialize(items: List[EntityType]) -> dict:
    return [item.to_dict() for item in items]

def get_searched_data(matcher: Callable[[EntityType, str], bool], items: List[EntityType], search_query: str) -> dict:
    search = search_query.lower().strip()
    if not search: 
        return deserialize(items)
  
    return deserialize([item for item in items if matcher(item, search)])

def create_access_token(data: dict):
    """Generates a signed JWT token."""
    to_encode = data.copy()
    minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
    expire = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt

