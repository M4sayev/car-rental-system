from src.repositories.base_repo import Repository

from typing import List, Optional
import logging
from datetime import datetime
from src.db.connection import get_connection
from psycopg2 import extras, sql

from src.types.table_types import TableType

logger = logging.getLogger(__name__)

class PostgresRepository(Repository):
    """
    Concrete repository for managing entities.
    Extends the abstract Repository and implements CRUD operations.
    Maintains a history of the last N (default = 10) deleted clients.
    """
    def __init__(self, id_field: str, table_name: TableType, deleted_history_size: int = 10):
        """
        Initialize the client repository.

        """
        super().__init__()
        self.table_name = table_name
        self.id_field = id_field
        self._deleted_history_size = deleted_history_size
        self.conn = get_connection()    

    def read_all(self, table_name: TableType) -> List[dict]:
        """Return all items in the repository."""
        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:

                query = sql.SQL("SELECT * FROM {}").format(sql.Identifier(table_name))
                cur.execute(query)
                rows = cur.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            logger.error(f"Read error {e}")
            return []
    def get_by_ids(self, table_name: TableType, ids: List[str]) -> List[dict]:
        """Return all id-matching items in the repository."""
        if not ids:
            return []
        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:

                query = sql.SQL(
                            """
                            SELECT *
                            FROM {}
                            WHERE {} IN %s
                            """).format(sql.Identifier(table_name), sql.Identifier(self.id_field))
                
                cur.execute(query, (tuple(ids),))
                rows = cur.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            logger.error(f"Error fetching multiple records: {e}")
        return []

    def create(self, item: dict, table_name: TableType) -> bool:
        """Add a new item to the repository."""
        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:

                columns = item.keys()
                values = list(item.values())

                

                table_cols = sql.SQL(', ').join(map(sql.Identifier, columns))
                placeholders = sql.SQL(", ").join(
                    sql.Placeholder() for _ in values
                )

                query = sql.SQL("INSERT INTO {} ({}) VALUES({}) RETURNING*").format(sql.Identifier(table_name), table_cols, placeholders)
                cur.execute(query, values)
                logger.info(f"Item created: {item.get(self.id_field)}")
                new_item = cur.fetchone()
                self.conn.commit()
                return  dict(new_item) if new_item else None

        except Exception as e:
            logger.error(f"Create error: {e}")
            return False
        
    def find_by_id(self, item_id: str) -> Optional[dict]:
        """Find a item by item_id."""
        with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            query = sql.SQL(
                        """
                        SELECT * 
                        FROM {}
                        WHERE {} = %s
                        """).format(sql.Identifier(self.table_name), sql.Identifier(self.id_field))
            cur.execute(query, (item_id, ))
            result = cur.fetchone()
            return dict(result) if result else None
        return None
    
    def update(self, item_id: str, updated_fields: dict) -> bool | dict:
        """Update a item's fields except the item_id."""

        if not updated_fields:
            return self.find_by_id(item_id)
        
        if self.id_field in updated_fields:
            logger.warning(f"Cannot update id")
            raise ValueError(f"Cannot update the {item_id}")

        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:

                set_parts = [
                    sql.SQL("{} = %s").format(sql.Identifier(col)) 
                    for col in updated_fields.keys()
                ]
                values = list(updated_fields.values())  

                table_cols = sql.SQL(", ").join(set_parts)

                query = sql.SQL(
                            """
                            UPDATE {}
                            SET {}
                            WHERE {} = %s
                            RETURNING*
                            """
                        ).format(
                                sql.Identifier(self.table_name),
                                table_cols, 
                                sql.Identifier(self.id_field)
                            )
                
                params = values + [item_id]
                cur.execute(query, params)

                result = cur.fetchone()
            if not result:
                logger.warning(f"Item with id {item_id} not found.")
                return False
            
            self.conn.commit()
            return dict(result)
        except Exception as e:
            logger.error(f"Create error: {e}")
            return False
    
    def delete(self, item_id: str) -> bool | dict:
        """Delete a item and store in deleted history."""
        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
                query = sql.SQL("DELETE FROM {} WHERE {} = %s RETURNING *").format(sql.Identifier(self.table_name), sql.Identifier(self.id_field))

                cur.execute(query, (item_id,))

                result = cur.fetchone()

                
                if not result:
                    logger.warning(f"Item with id {item_id} not found.")
                    return False
            
                current_date = datetime.now().date().isoformat()
                result["deletion_date"] = current_date
                
                if self.id_field != 'rental_id':
                    self._create_deleted(result)
            
                self.conn.commit()
                logger.info(f"Item with id {item_id} successfully deleted.")
                return dict(result)

        except Exception as e:
            logger.error(f"Delete error: {e}")
            return False
        
    def _delete_oldest_by_date(self, table_name: str):
        """Find the record with the earliest (oldest) date in a specific column."""
        try:
            with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
                query = sql.SQL(
                """
                DELETE FROM {} 
                WHERE {} = (
                    SELECT {} FROM {} 
                    WHERE {} IS NOT NULL
                    ORDER BY {} ASC 
                    LIMIT 1
                )
                RETURNING *
                """
            ).format(
                sql.Identifier(table_name), 
                sql.Identifier(self.id_field),   
                sql.Identifier(self.id_field),   
                sql.Identifier(table_name),
                sql.Identifier("deletion_date"),
                sql.Identifier("deletion_date")
            )
                
                cur.execute(query)
                result = cur.fetchone()
                return dict(result) if result else None
                
        except Exception as e:
            logger.error(f"Error finding oldest record: {e}")
            return False
    
    def _create_deleted(self, item: dict):        
        with self.conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            deleted_table_name = f"deleted_{self.table_name}"
            query = sql.SQL("SELECT COUNT(*) FROM {}").format(
                sql.Identifier(deleted_table_name)
            )

            cur.execute(query)
            count = cur.fetchone()["count"] or 0

            if (count == self._deleted_history_size):
                self._delete_oldest_by_date(deleted_table_name)

            self.create(item, deleted_table_name)
            self.conn.commit()

    def get_deleted_history(self) -> List[dict]:
        """Return a list of the last deleted items."""
        deleted_table_name = f"deleted_{self.table_name}"
        return self.read_all(deleted_table_name)
        
        

