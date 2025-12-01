import pytest
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


def test_create_read_find(repo):
    assert repo.read_all() == []
    assert repo.create({'id': '1', 'name': 'Test'})
    assert len(repo.read_all()) == 1
    assert repo.find_by_id('1')['name'] == 'Test'
    assert repo.find_by_id('invalid') is None

def test_update_delete(repo):
    repo.create({'id': '1', 'name': 'Old'})
    assert repo.update('1', {'id': '1', 'name': 'New'})
    assert repo.find_by_id('1')['name'] == 'New'
    assert repo.update('invalid', {}) is False
    
    assert repo.delete('1') is True
    assert repo.find_by_id('1') is None
    assert repo.delete('invalid') is False

def test_multiple_operations(repo):
    for i in range(5):
        repo.create({'id': str(i), 'value': i * 10})
    assert len(repo.read_all()) == 5
    
    for i in range(3):
        repo.delete(str(i))
    assert len(repo.read_all()) == 2

def test_edge_cases(repo):
    repo.create({})
    repo.create({'id': 'id-@123', 'name': 'Müller'})
    repo.create({'id': '1', 'data': {'nested': 'value'}})
    
    assert len(repo.read_all()) == 3
    assert repo.find_by_id('id-@123') is not None
    assert repo.find_by_id('1')['data']['nested'] == 'value'

def test_persistence(temp_repo_file):
    repo1 = Repository(temp_repo_file)
    repo1.create({'id': '1', 'name': 'Test'})
    
    repo2 = Repository(temp_repo_file)
    assert len(repo2.read_all()) == 1
    assert repo2.find_by_id('1')['name'] == 'Test'

def test_error_handling():
    with pytest.raises(Exception):
        repo = Repository('/invalid/path/file.json')
        repo.read_all()
    
    with NamedTemporaryFile(mode='w+', delete=False) as tf:
        tf.write("invalid json")
        temp_file = tf.name
    try:
        repo = Repository(temp_file)
        with pytest.raises(Exception):
            repo.read_all()
    finally:
        os.remove(temp_file)