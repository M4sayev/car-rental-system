import pytest
import json
import os
from tempfile import NamedTemporaryFile
from repositories.repository import Repository

@pytest.fixture
def temp_repo_file():
    # Use a temporary file for testing
    with NamedTemporaryFile(mode='w+', delete=False) as tf:
        tf.write("[]")  # start with empty JSON array
        tf.flush()
        yield tf.name
    os.remove(tf.name)

@pytest.fixture
def repo(temp_repo_file):
    return Repository(temp_repo_file)

def test_create_and_read_all(repo):
    item = {'id': '1', 'name': 'Test Item'}
    assert repo.create(item) is True
    all_items = repo.read_all()
    assert len(all_items) == 1
    assert all_items[0]['id'] == '1'

def test_find_by_id(repo):
    item = {'id': '2', 'name': 'Second Item'}
    repo.create(item)
    found = repo.find_by_id('2')
    assert found is not None
    assert found['name'] == 'Second Item'
    assert repo.find_by_id('nonexistent') is None

def test_update(repo):
    item = {'id': '3', 'name': 'Old Name'}
    repo.create(item)
    updated_item = {'id': '3', 'name': 'New Name'}
    assert repo.update('3', updated_item) is True
    found = repo.find_by_id('3')
    assert found['name'] == 'New Name'
    # test updating nonexistent item
    assert repo.update('999', updated_item) is False

def test_delete(repo):
    item = {'id': '4', 'name': 'Delete Me'}
    repo.create(item)
    assert repo.delete('4') is True
    assert repo.find_by_id('4') is None
    # test deleting nonexistent item
    assert repo.delete('999') is False

def test_json_integrity(repo):
    # create multiple items and verify JSON structure
    items = [{'id': str(i)} for i in range(5)]
    for item in items:
        repo.create(item)
    all_items = repo.read_all()
    assert len(all_items) == 5
    assert all(isinstance(i, dict) for i in all_items)