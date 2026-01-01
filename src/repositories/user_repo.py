from src.repositories.concrete_repo import PostgresRepository
from psycopg2 import extras, sql

from typing import Optional

import logging

logger = logging.getLogger(__name__)

class UserRepository(PostgresRepository):

    def __init__(self):
        """
        Initialize a user repository
        """
        super().__init__(self, id_field="id", table_name="users")
    
    def find_by_username(self, username: str) -> Optional[dict]:
        """
        Find a user by username
        """
        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
                query = sql.SQL(
                            """
                            SELECT * FROM users
                            WHERE username = %s
                            """
                            )
                
                cur.execute(query, username)

                result = cur.fetchone()
                return dict(result) if result else None 
        except Exception as e:
            logger.error(f"Error finding user: {e}")
            return None


            
        

    
