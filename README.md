# 🚗 Car Rental Management System

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Pytest-orange.svg)](https://pytest.org/)

A Python-based Car Rental Management System implementing object-oriented programming principles, repository pattern, and comprehensive unit testing.

---

## 📋 Project Overview

This system allows management of cars, clients, and rentals, implementing core OOP concepts:

- **Encapsulation**: Classes manage their own data and behavior
- **Inheritance & Polymorphism**: Different types of vehicles can extend common behavior (e.g., Car, SUV)
- **Composition**: Rental objects are composed of Car and Client instances
- **Repository Pattern**: File-based storage for CRUD operations on cars, clients, and rentals

---

## ✨ Features

- ✅ Add, retrieve, and manage Cars and Clients
- ✅ Record Rentals and calculate rental costs
- ✅ Persist data to JSON files using a repository
- ✅ Logging for repository operations
- ✅ Fully tested with unit tests for models, services, and repositories

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/M4sayev/car-rental-system.git
cd car-rental-system
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

**Windows (CMD):**
```cmd
venv\Scripts\activate.ps1
```

**macOS / Linux:**
```bash
source venv/bin/activate.ps1
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 📁 Project Structure

```
car_rental_project/
│
├── data/
│   ├── cars.json
│   ├── clients.json
│   └── rentals.json
│
├── docs/
│   ├── ER (for db).png
│   ├── UML.png
│   ├── technical_documentation.md
│   └── user_guide.md
│
├── src/
│   ├── models/
│   │   ├── base.py
│   │   ├── car.py
│   │   ├── client.py
│   │   └── rental.py
│   │
│   ├── repositories/
│   │   └── repository.py
│   │
│   ├── services/
│   │   └── rental_service.py
│   │
│   └── main.py              # Entry point
│
├── tests/
│   ├── test_car.py
│   ├── test_client.py
│   ├── test_rental.py
│   └── test_repository.py
│
├── run.py
├── requirements.txt
└── README.md
```

---

## 🎯 Running the Application

Run the main script:

```bash
python run.py
or
python src/main.py
```

> **Note:** This currently serves as a starting point; additional CLI or UI features can be added in future sprints.

---

## 🧪 Running Tests

Tests are written with `pytest`. Run all tests using:

```bash
pytest
```

## 📊 Data Storage

The application uses JSON files for persistence:

| File | Purpose |
|------|---------|
| `data/cars.json` | Stores car information |
| `data/clients.json` | Stores client information |
| `data/rentals.json` | Stores rental records |

---

## 📝 Logging

Repository operations are logged for traceability:

- File creation
- CRUD operations
- Error tracking

Logs are displayed in the console during execution at INFO level.

---

## 🛣️ Roadmap

- [ ] Implement Update and Delete operations
- [ ] Add data validation and business rules
- [ ] Develop CLI interface
- [ ] Add GUI (optional)
- [ ] Expand test coverage for edge cases
- [ ] Add database support (PostgreSQL/MySQL)

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- All tests pass
- Code follows PEP 8 style guidelines
- New features include unit tests

---

## 📄 License

This project is licensed under the MIT License

---

## 👥 Authors

- Eltun Jalilli [https://github.com/EltunLTN](GitHub)
- Elvin Musayev [https://github.com/M4Sayev](GitHub)

---

## 🙏 Acknowledgments

- Python community
- Contributors and testers
- Open source libraries used in this project

---

<div align="center">
Made with 🐍
</div>
