from typing import Optional, List
from src.utils.entity import generate_id
from src.models.user import User
from src.auth.security import hash_password, verify_password
from src.repositories.user_repo import UserRepository
import logging

logger = logging.getLogger(__name__)

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo  

    def _verify_user_exists(self, username: str) -> Optional[User]:
        """Helper function to verify if the user exists"""
        user = self.user_repo.find_by_username(username)

        if not user:
            logger.warning("User with given username doesn't exist")
            return None
        
        return user


    def add_user(self, user: User) -> bool:  
        """Add a new user to the system"""
        existing_user = self.user_repo.find_by_username(user.username)
        if existing_user:
            logger.warning(f"Registration failed: {user.username} already exists")
            return False
        
        id = generate_id()
        password = hash_password(user.hashed_password)
        
        user = User(id, user.username, password, user.role)

        created = self.user_repo.create(user.to_dict(), "users")

        if created:
            logger.info("User successfully created")
            return True
        
        return False
    

    def authenticate(self, username: str, password: str) -> Optional[User]:
        """Verifies credentials and returns the User object if valid."""
        user = self._verify_user_exists(username)

        if not user:
            return None

        if not verify_password(password, user.hashed_password):
            logger.warning(f"Login attempt failed: Wrong password for {username}")
            return None
        
        logger.info(f"User {username} authenticated successfully")
        return user
    
    def authenticate_admin(self, username, password) -> Optional[User]:
        user = self.authenticate(username, password)
        if user and user.role == "admin":
            return user
        logger.warning(f"Access denied: {username} is not an admin")
        return None



                

