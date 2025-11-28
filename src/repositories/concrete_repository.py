from src.repositories.base_repository import Repository

from typing import List, Optional
import logging
import json


logger = logging.getLogger(__name__)

class JsonRepository(Repository):
    """
    Concrete repository for managing entities.
    Extends the abstract Repository and implements CRUD operations.
    Maintains a history of the last N (default = 10) deleted clients.
    """
    def __init__(self, file_path: str, id_field: str, deleted_history_size: int = 10):
        """
        Initialize the client repository.

        Args:
            client_file_path (str): Path to the JSON file storing clients.
        """
        super().__init__(file_path)
        self.id_field = id_field
        self.deleted_history: List[dict] = []
        self._deleted_history_size = deleted_history_size

    def create(self, item: dict) -> bool:
        """Add a new item to the repository."""
        try:
            items = self.read_all()
            items.append(item)
            self._save(items)
            logger.info(f"Item created: {item.get(self.id_field)}")
            return True
        except Exception as e:
            logger.error(f"Create error: {e}")
            return False
        
    def read_all(self) -> List[dict]:
        """Return all items in the repository."""
        try:
            with open(self.file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            logger.warning(f"Invalid JSON in {self.file_path}, returning empty list")
            return []
        except Exception as e:
            logger.error(f"Read error {e}")
            return []
        
    def find_by_id(self, item_id: str) -> Optional[dict]:
        """Find a item by item_id."""
        items = self.read_all()
        for item in items:
            if item.get(self.id_field) == item_id:
                return item
        return None
    
    def update(self, item_id: str, updated_fields: dict) -> bool:
        """Update a item's fields except the item_id."""
        try:
            items = self.read_all()
            for item in items:
                if item.get(self.id_field) == item_id:
                    # Prevent changing the item_id
                    if self.id_field in updated_fields:
                        raise ValueError(f"Cannot update the {item_id}")
                    
                    item.update(updated_fields)
                    self._save(items)
                    logger.info(f"Item with id {item_id} was successfully updated")
                    return True
            logger.warning(f"Item with id {item_id} not found.")
            return False
        except Exception as e:
            logger.error(f"Update error: {e}")
            return False

    def delete(self, item_id:str) -> bool:
        """Delete a item and store in deleted history."""
        try:
            items = self.read_all()
            for index, item in enumerate(items):
                if item.get(self.id_field) == item_id:
                    deleted_item = items.pop(index)
                    self.deleted_history.append(deleted_item)

                    # Keep the client number max deleted_history_size
                    if len(self.deleted_history) > self._deleted_history_size:
                        self.deleted_history.pop(0)
                    
                    self._save(items)
                    logger.info(f"Item with id {item_id} successfully deleted.")
                    return True
            logger.warning(f"Item with id {item_id} not found")
            return False
        except Exception as e:
            logger.error(f"Delete error: {e}")
            return False
    
    def get_deleted_history(self) -> List[dict]:
        """Return a list of the last deleted items."""
        return self.deleted_history
