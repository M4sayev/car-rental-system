import pytest

from src.models.client import Client
from src.repositories.concrete_repository import JsonRepository
from src.services.client_service import ClientService


@pytest.fixture
def clients_repo(tmp_path):
    file_path = tmp_path / "clients.json"
    repo = JsonRepository(str(file_path), id_field="client_id")
    repo._save_deleted_history = lambda: None

    class RepoShim:
      def __init__(self, inner):
        self._inner = inner
      def read(self, item_id):
        return self._inner.find_by_id(item_id)
      def __getattr__(self, name):
        return getattr(self._inner, name)

    return RepoShim(repo)


@pytest.fixture
def client_service(clients_repo):
    return ClientService(clients_repo)


def test_add_and_get_client(client_service):
  base_client = Client("TEMP", "John Doe", "john@example.com", "123")
  created = client_service.add_client(base_client)
  assert isinstance(created, Client)

  fetched = client_service.get_client(created.client_id)
  assert fetched is not None
  assert fetched.client_id == created.client_id
  assert fetched.name == "John Doe"


def test_get_all_clients(client_service):
  client_service.add_client(Client("TEMP", "A", "a@example.com", "111"))
  client_service.add_client(Client("TEMP", "B", "b@example.com", "222"))

  all_clients = client_service.get_all_clients()
  names = {c.name for c in all_clients}
  assert {"A", "B"}.issubset(names)


def test_delete_client(client_service):
  created = client_service.add_client(Client("TEMP", "Delete Me", "d@example.com", "999"))
  deleted = client_service.delete_client(created.client_id)
  assert isinstance(deleted, Client)
  assert client_service.get_client(created.client_id) is None


