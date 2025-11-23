import pytest
from models.client import Client

@pytest.fixture
def client():
    return Client('CL001', 'John Doe', 'john@example.com', '+1234567890')

def test_client_properties(client):
    """Client properties testi"""
    assert client.client_id == 'CL001'
    assert client.name == 'John Doe'
    assert client.email == 'john@example.com'

def test_to_dict(client):
    """Client serialization testi"""
    client_dict = client.to_dict()
    assert client_dict['client_id'] == 'CL001'
    assert client_dict['name'] == 'John Doe'

def test_from_dict():
    """Client deserialization testi"""
    client_dict = {
        'client_id': 'CL002',
        'name': 'Jane Smith',
        'email': 'jane@example.com',
        'phone': '+0987654321'
    }
    client = Client.from_dict(client_dict)
    assert client.client_id == 'CL002'
    assert client.name == 'Jane Smith'