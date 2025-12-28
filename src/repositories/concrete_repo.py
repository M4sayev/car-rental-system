from src.repositories.base_repo import Repository

from typing import List, Optional
import logging
from datetime import datetime
from db.connection import get_connection

logger = logging.getLogger(__name__)

class PostgresRepository(Repository):
    """
    Concrete repository for managing entities.
    Extends the abstract Repository and implements CRUD operations.
    Maintains a history of the last N (default = 10) deleted clients.
    """
    def __init__(self, id_field: str, deleted_history_size: int = 10):
        """
        Initialize the client repository.

        """
        super().__init__()
        self.id_field = id_field
        self._deleted_history_size = deleted_history_size
        self.conn = get_connection() 

