from src.types.entity_types import UserRole
class User():
    """
    Represents a user

    Attributes:
        id (str): Unique identifier for the user.
        username (str): Username of the user
        hashed_password (str): Encrypted password of the user
        role (UserRole): Role of the user (admin or user)
    """
    def __init__(self, id:str, username: str, hashed_password, role: UserRole = "user"):
        """
        Initialize a user

        Args:
            id (str): Unique identifier for the user.
            username (str): Username of the user
            hashed_password (str): Encrypted password of the user
            role (UserRole): Role of the user (admin or user), default is user 
        """
        self._id = id
        self._username = username
        self._hashed_password = hashed_password
        self._role = role

        self._validate()

    
    def _validate(self):
        """Internal user validation"""
        if not isinstance(self._id, str) or not self._id:
            raise ValueError("Id must be a non-empty string")

        if not isinstance(self._username, str) or len(self._username.strip()) < 2:
            raise ValueError("Username must be a string with more than 2 characters")
        
        if not isinstance(self._hashed_password, str) or not self._hashed_password:
            raise ValueError("Hashed password must be a non-empty string")
        
        if not isinstance(self._role, UserRole) or not self._role:
            raise ValueError("Role of the user must be either 'user' or 'admin'")
    
    @property
    def id(self):
        """Return the user's unique identifier."""
        return self._id

    @property
    def username(self) -> str:
        """Return the user's username."""
        return self._username

    @property
    def role(self) -> UserRole:
        """Return the role of the user."""
        return self._role

    @property
    def hashed_password(self) -> str:
        """Return the hashed password of the user."""
        return self._hashed_password
    