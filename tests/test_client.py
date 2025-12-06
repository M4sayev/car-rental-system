import pytest
from src.models.client import Client

@pytest.fixture
def client():
    return Client('CL001', 'John Doe', 'john@example.com', '+1234567890')

# Properties
def test_client_properties(client):
    assert client.client_id == 'CL001'
    assert client.name == 'John Doe'
    assert client.email == 'john@example.com'
    assert client.phone == '+1234567890'

# Serialization
def test_to_dict(client):
    d = client.to_dict()
    assert d['client_id'] == 'CL001'
    assert d['name'] == 'John Doe'
    assert d['email'] == 'john@example.com'
    assert d['phone'] == '+1234567890'

# Deserialization
def test_from_dict():
    d = {'client_id': 'CL002', 'name': 'Jane Smith', 
         'email': 'jane@example.com', 'phone': '+0987654321'}
    client = Client.from_dict(d)
    assert client.client_id == 'CL002'
    assert client.name == 'Jane Smith'

# Round-trip
def test_round_trip(client):
    new_client = Client.from_dict(client.to_dict())
    assert new_client.client_id == client.client_id
    assert new_client.name == client.name

# Edge cases
def test_empty_strings():
    with pytest.raises(ValueError):
        Client('', '', '', '')

def test_special_characters():
    client = Client('CL-001', "O'Brien", 'test+tag@example.com', '+1 (555) 123-4567')
    assert client.client_id == 'CL-001'

def test_unicode():
    client = Client('CL002', 'Müller', 'test@example.de', '+49123')
    assert client.name == 'Müller'

def test_long_values():
    client = Client('CL003', 'A' * 200, 'a@b.com', '123')
    assert len(client.name) == 200

def test_multiple_instances():
    c1 = Client('CL004', 'Alice', 'a@test.com', '111')
    c2 = Client('CL005', 'Bob', 'b@test.com', '222')
    assert c1.client_id != c2.client_id