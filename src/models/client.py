import re
class Client:
    """Represents a client in the rental system."""

    # regex patterns for validation
    _email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
    _phone_pattern = r"^\+?\d{3,20}$"  

    def __init__(self, client_id: str, name: str, email: str, phone: str):
        """
        Initialize a Client object.

        Args:
            client_id (str): Unique identifier for the client.
            name (str): Full name of the client.
            email (str): Email address of the client.
            phone (str): Phone number of the client.
        """
        self._client_id = client_id
        self._name = name
        self._email = email
        self._phone = phone

        # validate on initialization
        self.validate()

    def __str__(self):
        return f"Client[{self._client_id}] {self._name} | Email: {self._email} | Phone: {self._phone}"

    def validate(self):
        """Public validation callable by service layer"""
        if not isinstance(self._client_id, str) or not self._client_id.strip():
            raise ValueError("Client id must be a non-empty string")
        if not isinstance(self._name, str) or not self._name.strip():
            raise ValueError("Name must be a non-empty string") 
        
        # email validation
        if not isinstance(self._email, str) or not self._email.strip():
            raise ValueError("Email must be a non-empty string")
        self._validate_email(self._email)
        
        # phone number validation 
        if not isinstance(self._phone, str) or not self._phone.strip():
            raise ValueError("Phone must be a non-empty string")
        self._validate_phone(self._phone)
    
    # helper validation methods 
    def _validate_email(self, value: str):
        if not re.match(self._email_pattern, value):
            raise ValueError(f"Invalid email format: {value}")
        
    def _validate_phone(self, value: str):
        if not re.match(self._phone_pattern, value):
            raise ValueError(f"Invalid phone number format: {value}")
        

    @property
    def client_id(self) -> str:
        """Get the client's unique identifier."""
        return self._client_id

    @property
    def name(self) -> str:
        """Get the client's name."""
        return self._name

    @property
    def email(self) -> str:
        """Get the client's email address."""
        return self._email
    
    @email.setter 
    def email(self, value:str):
        """Set the client's email and validate."""
        self._validate_email(value)
        self._email = value.strip()

    @property
    def phone(self) -> str:
        """Get the client's phone number"""
        return self._phone
    
    @phone.setter 
    def phone(self, value:str):
        """Set the client's phone number and validate."""
        self._validate_phone(value)
        self._phone= value.strip()

    def to_dict(self) -> dict:
        """Convert Client object to a dictionary for JSON serialization."""
        return {
            'client_id': self._client_id,
            'name': self._name,
            'email': self._email,
            'phone': self._phone
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Client":
        """Create a Client object from a dictionary (JSON deserialization)."""
        return cls(
            client_id=data['client_id'],
            name=data['name'],
            email=data['email'],
            phone=data['phone']
        )
