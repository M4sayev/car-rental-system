# Car Rental Management System – Technical Documentation

## Sprint 1 – OOP Implementation

### Project Structure

car_rental_project/
├── src/
│ ├── models/ # Domain models
│ ├── repositories/ # Data access layer
│ ├── services/ # Business logic layer
│ └── main.py # Entry point
├── tests/ # Unit tests
├── docs/ # Documentation
└── data/ # JSON data files

---

### OOP Principles

#### 1. Abstraction

- The **Vehicle** class is used as an abstract base class.
- Abstract method: `calculate_rental_cost()`.

#### 2. Inheritance

- The **Car** class inherits from **Vehicle**.
- The `super()` method is used to call the parent class constructor.

#### 3. Encapsulation

- All attributes are private (prefixed with `_`).
- Public access is provided via `@property` decorators.
- Setter methods are used to control restricted access.

#### 4. Polymorphism

- The `calculate_rental_cost()` method is overridden in the `Car` class.
- Additional fees are applied for SUV-type cars.

#### 5. Composition

- The **Rental** class uses **Car** and **Client** classes as components (composition).

---

### Classes

#### Vehicle (Abstract Base Class)

- `vehicle_id`: Unique ID of the vehicle
- `brand`: Brand name
- `model`: Model name
- `daily_rate`: Daily rental rate
- `is_available`: Availability status

#### Car (Concrete Class)

- Inherits from Vehicle
- `car_type`: Type of car (SUV, Sedan, etc.)
- `seats`: Number of seats
- `calculate_rental_cost()`: Calculates rental cost

#### Client

- `client_id`: Unique ID of the client
- `name`: Name
- `email`: Email address
- `phone`: Phone number

#### Rental

- `rental_id`: Unique rental ID
- `car`: Car object (composition)
- `client`: Client object (composition)
- `start_date`: Rental start date
- `end_date`: Rental end date
- `total_cost`: Total cost
- `is_active`: Active status

#### Repository

- Provides CRUD operations (Create, Read, Update, Delete)
- Works with JSON files
- Supports logging

#### RentalService

- Business logic layer
- Manages Cars, Clients, and Rentals
- Uses the Repository pattern

---

### Data Storage

- JSON files are used for persistence.
- `data/cars.json`: Stores car data
- `data/clients.json`: Stores client data
- `data/rentals.json`: Stores rental records

---

### Testing

- Unit tests are located in the `tests/` folder
- `pytest` framework is used
- Tests cover inheritance, polymorphism, encapsulation, and composition behaviors

---

### Logging

- Python `logging` module is used
- Logs are recorded at the INFO level
- Tracks repository operations and important events
