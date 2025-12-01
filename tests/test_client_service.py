import pytest
from src.models.client import Client
from src.repositories.concrete_repository import JsonRepository
from src.services.client_service import ClientService


@pytest.fixture
def clients_repo(tmp_path):
    return JsonRepository(str(tmp_path / "clients.json"), id_field="client_id")

@pytest.fixture
def client_service(clients_repo):
    return ClientService(clients_repo)


def test_add_and_get_client(client_service):
    client = client_service.add_client(Client("TEMP", "John Doe", "john@example.com", "123"))
    assert client.client_id != "TEMP"
    assert client_service.get_client(client.client_id).name == "John Doe"
    assert client_service.get_client("INVALID") is None

def test_get_all_clients(client_service):
    assert client_service.get_all_clients() == []
    client_service.add_client(Client("T", "A", "a@example.com", "111"))
    client_service.add_client(Client("T", "B", "b@example.com", "222"))
    assert len(client_service.get_all_clients()) == 2

def test_update_client(client_service):
    client = client_service.add_client(Client("T", "John", "john@example.com", "123"))
    updated = client_service.update_client(client.client_id, {"name": "Jane", "email": "jane@example.com"})
    assert updated.name == "Jane" and updated.email == "jane@example.com"
    assert client_service.update_client("INVALID", {}) is None

def test_delete_client(client_service):
    client = client_service.add_client(Client("T", "Delete Me", "d@example.com", "999"))
    deleted = client_service.delete_client(client.client_id)
    assert isinstance(deleted, Client)
    assert client_service.get_client(client.client_id) is None
    assert client_service.delete_client("INVALID") is None

def test_search_clients(client_service):
    client_service.add_client(Client("T", "John Doe", "john@example.com", "123"))
    client_service.add_client(Client("T", "Jane Doe", "jane@example.com", "456"))
    client_service.add_client(Client("T", "Bob Smith", "bob@example.com", "789"))
    
    assert len(client_service.search_clients(name="Doe")) == 2
    assert len(client_service.search_clients(email="john@example.com")) == 1
    assert len(client_service.search_clients(name="Doe", email="jane@example.com")) == 1
    assert len(client_service.search_clients(name="NotFound")) == 0