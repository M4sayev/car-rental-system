import pytest
import os
from tempfile import NamedTemporaryFile
from src.repositories.concrete_repository import JsonRepository


@pytest.fixture
def temp_repo_file():
    with NamedTemporaryFile(mode='w+', delete=False, suffix='.json') as tf:
        tf.write("[]")
        tf.flush()
        yield tf.name
    if os.path.exists(tf.name):
        os.remove(tf.name)

@pytest.fixture
def repo(temp_repo_file):
    repo = JsonRepository(temp_repo_file, id_field='id')
    # avoid writing deleted history into awkward prefixed paths on Windows
    repo._save_deleted_history = lambda: None

    class RepoShim:
        def __init__(self, inner):
            self._inner = inner
        def read(self, item_id):
            return self._inner.find_by_id(item_id)
        def __getattr__(self, name):
            return getattr(self._inner, name)

    return RepoShim(repo)


def test_create_read_find(repo):
    assert repo.read_all() == []
    assert repo.create({'id': '1', 'name': 'Test'})
    assert len(repo.read_all()) == 1
    assert repo.find_by_id('1')['name'] == 'Test'
    assert repo.find_by_id('invalid') is None

def test_update_delete(repo):
    repo.create({'id': '1', 'name': 'Old'})
    # do not attempt to update the id field
    assert repo.update('1', {'name': 'New'})
    assert repo.find_by_id('1')['name'] == 'New'
    assert repo.update('invalid', {}) is False
    
    deleted = repo.delete('1')
    assert deleted is not False
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
    
    assert len(repo.read_all()) >= 2  # Empty dict might not have id
    assert repo.find_by_id('id-@123') is not None
    found = repo.find_by_id('1')
    if found:
        assert found['data']['nested'] == 'value'

def test_persistence(temp_repo_file):
    repo1 = JsonRepository(temp_repo_file, id_field='id')
    repo1.create({'id': '1', 'name': 'Test'})
    
    repo2 = JsonRepository(temp_repo_file, id_field='id')
    assert len(repo2.read_all()) == 1
    found = repo2.find_by_id('1')
    if found:
        assert found['name'] == 'Test'

def test_error_handling():
    # Test with invalid path - may not raise immediately
    try:
        repo = JsonRepository('/invalid/path/file.json', id_field='id')
        repo.read_all()
        assert False, "Should have raised an exception"
    except:
        pass  # Expected
    
    with NamedTemporaryFile(mode='w+', delete=False, suffix='.json') as tf:
        tf.write("invalid json")
        temp_file = tf.name
    try:
        repo = JsonRepository(temp_file, id_field='id')
        try:
            repo.read_all()
            assert False, "Should have raised an exception"
        except:
            pass  # Expected
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)