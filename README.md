Car Rental Management System

A Python-based Car Rental Management System implementing object-oriented programming principles, repository pattern, and comprehensive unit testing.

Project Overview

This system allows management of cars, clients, and rentals, implementing core OOP concepts:

Encapsulation: Classes manage their own data and behavior.

Inheritance & Polymorphism: Different types of vehicles can extend common behavior (e.g., Car, SUV).

Composition: Rental objects are composed of Car and Client instances.

Repository Pattern: File-based storage for CRUD operations on cars, clients, and rentals.

Features

Add, retrieve, and manage Cars and Clients.

Record Rentals, calculate rental costs.

Persist data to JSON files using a repository.

Logging for repository operations.

Fully tested with unit tests for models, services, and repositories.

Getting Started

1. Clone the repository
   git clone <repo_url>
   cd <repo_folder>

2. Create a virtual environment
   python -m venv venv

3. Activate the virtual environment

Windows (CMD):

venv\Scripts\activate

macOS / Linux:

source venv/bin/activate

4. Install dependencies
   pip install -r requirements.txt

Project Structure
src/
│
├── models/
│ ├── base.py
│ ├── car.py
│ ├── client.py
│ └── rental.py
│
├── repositories/
│ └── repository.py
│
├── services/
│ └── rental_service.py
│
└── main.py # Entry point
tests/
│
├── test_car.py
├── test_client.py
├── test_rental.py
└── test_repository.py

Running the Application

Run the main script:

python src/main.py

(This currently serves as a starting point; additional CLI or UI features can be added in future sprints.)

Running Tests

Tests are written with pytest. Run all tests using:

pytest

Logging

Repository operations are logged for traceability:

File creation

CRUD operations

Contributing

Contributions are welcome! Make sure to:

Fork the repo

Create a new branch

Add or update features/tests

Submit a pull request

License

This project is licensed under the MIT License.
