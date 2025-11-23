import json
import logging
from typing import List, Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Repository:
    """Repository pattern - Dependency Inversion Principle"""

    def __init__(self, file_path: str):
        self.file_path = file_path
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        """Factory helper method"""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                pass
        except FileNotFoundError:
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump([], f)
            logger.info(f"Created new file: {self.file_path}")

    def create(self, item: dict) -> bool:
        """CRUD - Create"""
        try:
            items = self.read_all()
            items.append(item)
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(items, f, indent=2, ensure_ascii=False)
            logger.info(f"Item created: {item.get('id', item.get('vehicle_id', item.get('client_id', item.get('rental_id', 'unknown'))))}")
            return True
        except Exception as e:
            logger.error(f"Create error: {e}")
            return False

    def read_all(self) -> List[dict]:
        """CRUD - Read"""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except json.JSONDecodeError:
            logger.warning(f"Invalid JSON in {self.file_path}, returning empty list")
            return []
        except Exception as e:
            logger.error(f"Read error: {e}")
            return []

    def find_by_id(self, item_id: str) -> Optional[dict]:
        """CRUD - Read by ID"""
        items = self.read_all()
        for item in items:
            if item.get('id') == item_id or \
               item.get('vehicle_id') == item_id or \
               item.get('client_id') == item_id or \
               item.get('rental_id') == item_id:
                return item
        return None

    def update(self, item_id: str, updated_item: dict) -> bool:
        """CRUD - Update"""
        try:
            items = self.read_all()
            for i, item in enumerate(items):
                if item.get('id') == item_id or \
                   item.get('vehicle_id') == item_id or \
                   item.get('client_id') == item_id or \
                   item.get('rental_id') == item_id:
                    items[i] = updated_item
                    with open(self.file_path, 'w', encoding='utf-8') as f:
                        json.dump(items, f, indent=2, ensure_ascii=False)
                    logger.info(f"Item updated: {item_id}")
                    return True
            logger.warning(f"Item not found for update: {item_id}")
            return False
        except Exception as e:
            logger.error(f"Update error: {e}")
            return False

    def delete(self, item_id: str) -> bool:
        """CRUD - Delete"""
        try:
            items = self.read_all()
            original_count = len(items)
            items = [item for item in items if
                     item.get('id') != item_id and
                     item.get('vehicle_id') != item_id and
                     item.get('client_id') != item_id and
                     item.get('rental_id') != item_id]
            
            if len(items) < original_count:
                with open(self.file_path, 'w', encoding='utf-8') as f:
                    json.dump(items, f, indent=2, ensure_ascii=False)
                logger.info(f"Item deleted: {item_id}")
                return True
            else:
                logger.warning(f"Item not found for deletion: {item_id}")
                return False
        except Exception as e:
            logger.error(f"Delete error: {e}")
            return False