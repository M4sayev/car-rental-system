from typing import List, Optional
from src.models.client import Client
from src.repositories.base_repository import Repository
import uuid
import logging

logger = logging.getLogger(__name__)

class ClientService: 
    """Service layer - Business logic"""

    def __init__(self, clients_repo: Repository):
        self.clients_repo = clients_repo

    @staticmethod
    def _generate_id() -> str:
        return str(uuid.uuid4())
    
    def get_client(self, client_id: str) -> Optional[Client]:
        """Get client by ID"""
        client_dict = self.clients_repo.find_by_id(client_id)
        if client_dict:
            return Client.from_dict(client_dict)
        return None

    def get_all_clients(self) -> List[Client]:
        """Get all client"""
        all_clients = self.clients_repo.read_all()
        clients = [Client.from_dict(client) for client in all_clients]
        return clients

    def add_client(self, client: Client) -> Client | bool:
        """Add a new client to the system"""
        # Set the id dynamically
        client_id = self._generate_id()
        client = Client(client_id, client.name, client.email, client.phone)
        client_dict = client.to_dict()
        if self.clients_repo.create(client_dict):
            return client
        return False
    
    def delete_client(self, client_id: str) -> Client | bool:
        """Delete client by ID"""
        client = self.clients_repo.delete(client_id)
        if not client:
            return False 
        return Client.from_dict(client)

    def get_deleted_clients(self) -> List[dict]:
        """Get a list of deleted clients"""
        deleted_clients = self.clients_repo.get_deleted_history()
        return deleted_clients