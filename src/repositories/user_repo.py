from src.repositories.base_repo import Repository
from psycopg2 import extras, sql

from typing import Optional, List

from db.connection import get_connection

class UserRepository(Repository):

    def __init__(self):
        """
        Initialize a user repository
        """
        self.conn = get_connection()
    
    def find_by_id(self, id: str) -> Optional[dict]:
        with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            query = sql.SQL(""""
                            SELECT * FROM users
                            WHERE id = %s
                            """)
            result = cur.execute(query, (id, ))
            return dict(result) if result else None

    
            
        

    
