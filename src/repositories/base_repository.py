from abc import ABC, abstractmethod
import logging
import json
from typing import List, Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Repositort(ABC):
    """
    Abstract base class representing a generic repository.

    This class defines a template for CRUD operations and ensures the underlying
    JSON file exists.

    """
    def __init__(self, file_path: str):
        """
        Initialize the repository.

        Args:
            file_path (str): Path to the JSON file for storing the entity data.

        This constructor ensures the file exists by calling `_ensure_file_exists()`.
        """
        self.file_path = file_path
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        """
        Create the JSON file if it does not exist.
        
        Method is called automatically on the initialization. 
        It ensures that the json file exists if not it creates and empty array.
        """

        try:
            with open(self.file_path, 'r', encoding='utf-8'):
                pass
        except FileNotFoundError:
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump([], f)
            logger.info(f"Created new file: {self.file_path}")

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
        Find an item by its unique identifier.

        Args:
            item_id (str): The ID of the item to search for.

        Returns:
            Optional[dict]: The matching item as a dictionary, or None if not found.
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
