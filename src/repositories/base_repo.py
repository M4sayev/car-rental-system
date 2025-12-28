from abc import ABC, abstractmethod
import logging
from typing import List, Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Repository(ABC):
    """
    Abstract base class representing a generic repository.

    This class defines a template for CRUD operations and ensures the underlying

    """
    
    @abstractmethod
    def create(self, item: dict) -> bool:
        """
        Add a new item to the repository.

        Args:
            item (dict): Dictionary representing the entity to add.

        Returns:
            bool: True if creation succeeds, False otherwise.
        """
        pass

    @abstractmethod
    def read_all(self) -> List[dict]:
        """
        Retrieve all items from the repository.

        Returns:
            List[dict]: List of dictionaries representing all stored entities.
        """
        pass

    @abstractmethod
    def find_by_id(self, item_id: str) -> Optional[dict]:
        """
        Retrieve all items from the repository.

        Returns:
            List[dict]: List of dictionaries representing all stored entities.
        """
        pass

    @abstractmethod
    def update(self, item_id: str, updated_fields: dict) -> bool:
        """
        Update an existing item in the repository.

        Args:
            item_id (str): The ID of the item to update.
            updated_fields (dict): A dictionary of fields to update.

        Returns:
            bool: True if update succeeds, False otherwise.
        """
        pass

    @abstractmethod
    def delete(self, item_id: str) -> bool:
        """
        Delete an item from the repository by its ID.

        Args:
            item_id (str): The ID of the item to delete.

        Returns:
            bool: True if deletion succeeds, False otherwise.
        """
        pass