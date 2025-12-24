from api.types.types import EntityType
from typing import List
from collections.abc import Callable

def deserialize(items: List[EntityType]) -> dict:
    return [item.to_dict() for item in items]

def get_searched_data(matcher: Callable[[EntityType, str], bool], items: List[EntityType], search_query: str) -> dict:
    search = search_query.lower().strip()
    if not search: 
        return deserialize(items)
  
    return deserialize([item for item in items if matcher(item, search)])