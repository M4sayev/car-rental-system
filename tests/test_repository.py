import pytest
import json
import os
from tempfile import NamedTemporaryFile
from src.repositories.repository import Repository

@pytest.fixture
def temp_repo_file():
    with NamedTemporaryFile(mode='w+', delete=False) as tf:
        tf.write("[]")
        tf.flush()
        yield tf.name
    os.remove(tf.name)

@pytest.fixture
def repo(temp_repo_file):
    return Repository(temp_repo_file)

# Basic CRUD
def test_create_and_read_all(repo):
    item = {'id': '1', 'name': 'Test Item'}
    assert repo.create(item) is True
    all_items = repo.read_all()
    assert len(all_items) == 1
    assert all_items[0]['id'] == '1'

def test_find_by_id(repo):
    item = {'id': '2', 'name': 'Second Item'}
    repo.create(item)
    assert repo.find_by_id('2') is not None
    assert repo.find_by_id('nonexistent') is None

def test_update(repo):
    item = {'id': '3', 'name': 'Old Name'}
    repo.create(item)
    assert repo.update('3', {'id': '3', 'name': 'New Name'}) is True
    assert repo.find_by_id('3')['name'] == 'New Name'
    assert repo.update('999', {'id': '999'}) is False

def test_delete(repo):
    repo.create({'id': '4', 'name': 'Delete Me'})
    assert repo.delete('4') is True
    assert repo.find_by_id('4') is None
    assert repo.delete('999') is False

# Multiple operations
def test_multiple_creates(repo):
    for i in range(5):
        repo.create({'id': str(i)})
    assert len(repo.read_all()) == 5

def test_multiple_deletes(repo):
    for i in range(3):
        repo.create({'id': str(i)})
    for i in range(3):
        repo.delete(str(i))
    assert len(repo.read_all()) == 0

# Edge cases
def test_read_all_empty(repo):
    assert repo.read_all() == []

def test_empty_dict(repo):
    repo.create({})
    assert len(repo.read_all()) == 1

def test_special_characters(repo):
    item = {'id': 'id-@123', 'name': 'Müller'}
    repo.create(item)
    assert repo.find_by_id('id-@123') is not None

def test_nested_data(repo):
    item = {'id': '1', 'data': {'nested': 'value'}}
    repo.create(item)
    assert repo.find_by_id('1')['data']['nested'] == 'value'

# Persistence
def test_persistence(temp_repo_file):
    repo1 = Repository(temp_repo_file)
    repo1.create({'id': '1', 'name': 'Test'})
    repo2 = Repository(temp_repo_file)
    assert len(repo2.read_all()) == 1

# Error handling
def test_invalid_file_path():
    with pytest.raises(Exception):
        repo = Repository('/invalid/path/file.json')
        repo.read_all()

def test_corrupted_json():
    with NamedTemporaryFile(mode='w+', delete=False) as tf:
        tf.write("invalid json")
        temp_file = tf.name
    try:
        repo = Repository(temp_file)
        with pytest.raises(Exception):
            repo.read_all()
    finally:
        os.remove(temp_file)