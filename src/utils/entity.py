import uuid

def generate_id() -> str:
    """Generate random id"""
    return str(uuid.uuid4())