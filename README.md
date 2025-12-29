# 🚗 Car Rental Management System

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A full-stack car rental management system with intelligent cost calculation, modern UI, and comprehensive API, and persistence in data. Built as an OOP course project implementing design patterns, monolith architecture, and best practices.

---

## 🎯 Overview

**Backend:** FastAPI REST API with modular monolith and service layer pettern, Strategy/Decorator patterns for rental cost calculation, PostgreSQL-based repository pattern, ORM for data manipulation, and CLI interface.

**Frontend:** React + TypeScript SPA with shadcn/ui components, React Query for data fetching, Zod validation, and comprehensive testing.

**Key Features:**
- 🚙 Complete car inventory management with image uploads
- 👥 Client management system
- 📝 Rental creation and tracking
- 💰 Smart cost calculation (SUV premium, long-term discounts, holiday deals)
- 📊 Dashboard with real-time statistics
- 🗑️ Soft delete with recovery archives
- ⚡ Optimized queries with bulk fetching to prevent N+1 problems
- 🖥️ CLI for system management
- 🧪 Full test coverage (Pytest + Vitest)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- pip & npm

### 1. Clone Repository
```bash
git clone https://github.com/M4sayev/car-rental-system.git
cd car-rental-system
```

### 2. Backend Setup (navigate to api folder for a more feature specific readme)
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start API server
python run_api.py
```
API runs at: **http://localhost:8000**  
Docs: **http://localhost:8000/docs**

### 3. Frontend Setup (navigate to frontend folder for a more feature specific readme)
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```
App runs at: **http://localhost:5173**

---

## 📁 Project Structure

```
car-rental-system/
│
├── api/                          # FastAPI application
│   ├── main.py                   # App entry with CORS & static files
│   ├── routes/                   # API endpoints (cars, clients, rentals, dashboard)
│   ├── schemas/                  # Pydantic validation models
│   ├── utils/                    # utility and helper functions (deserialize(), save_image(),...)
│   ...
│   └── collections/              # Postman test collections (4 collections)
│
├── src/                          # Core business logic
│   ├── models/                   # Domain models
│   │   ├── car.py
│   │   ├── client.py
│   │   ├── rental.py
│   │   └── strategies/           # Cost calculation (Strategy + Decorator patterns)
│   ├── repositories/             # Data access layer (Postgresql storage)
│   ├── db/                       # Seed DB, connection to DB, table creation
│   ├── types/                    # Reusable types for type aliasing
│   └── services/                 # Business logic (car, client, rental services)
│
├── frontend/                     # React + TypeScript SPA
│   ├── src/
│   │   ├── components/           # UI components (shadcn/ui + custom + test for each scoped component folder)
│   │   ├── pages/                # Pages (dashboard, cars, clients, rentals)
│   │   ├── hooks/                # React Query hooks
│   │   ...
│   │   ├── constants/            # Model templates, Zod validation schemas, and reusable constants
│   │   └── utils/                # Utilities formatStringToISO, getStatusColor,... 
│   └── test/                     # Mock values for testing (MockClient, MockCar,...)
│
├── data/                         # JSON data for seeding database
│   ├── cars.json
│   ├── clients.json
│   └── rentals.json
│
├── deleted_data/                 # Soft-deleted records archive for seeding database
│
├── media/                        # Uploaded car images
│   └── cars/
│
├── docs/                         # Documentation
│   ├── UML.png
│   ├── ER (for db).png
│   ├── technical_documentation.md
│   ...
│   └── user_guide.md
│
├── tests/                        # Backend tests (Pytest)
│
├── cli.py                        # Command-line interface
├── run_api.py                    # API launcher
├── run.py                        # CLI launcher
└── requirements.txt              # Python dependencies
```

---

## 💻 Usage

### Web Interface
Navigate to **http://localhost:5173** for the full UI:
- Dashboard with statistics
- Manage cars (CRUD + image upload)
- Manage clients (CRUD + validation)
- Manage Rentals (CRUD + search option + validation)

### API
Access **http://localhost:8000/docs** for interactive API documentation with:
- 8 car endpoints (including cost calculator)
- 6 client endpoints
- 5 rental endpoints
- 2 dashboard endpoints

### Command Line
Quick operations via CLI:

```bash
# List cars (list-available / list-deleted for available / deleted respectively)
python cli.py car list

# Add a car interactively
python cli.py car add

# Delete a car (select from list)
python cli.py car delete

# List all clients (list-deleted for deleted clients)
python cli.py client list

# Add a client
python cli.py client add

# Create a rental
python cli.py rental create C001 CL001

# Complete a rental
python cli.py rental complete R001

# List active rentals
python cli.py rental list
```

---

## 🎨 Design Patterns

### Strategy Pattern
Different cost strategies based on car type:
```python
StandardCarCost      # Base daily rate
SUVRentalCost        # 20% premium for SUVs
```

### Decorator Pattern
Stackable discounts:
```python
LongTermRentalCost   # 15% off for 7+ days
HolidayDiscount      # 10% off on Azerbaijan holidays
```

**Example:** SUV rented for 10 days on a holiday = base × 1.2 × 0.85 × 0.9

---

## ⚡ Performance Optimizations

### N+1 Query Prevention
The repository layer implements bulk fetching to avoid N+1 query problems:
- Rentals are hydrated using bulk `get_by_ids()` operations
- Cars and clients are fetched in batches and mapped using hashmaps
- Result: Single query per entity type instead of N queries per rental

**Example:** Loading 100 rentals requires only 3 queries (rentals, cars, clients) instead of 201.

---

## 🧪 Testing

### Backend Tests
```bash
pytest                    # Run all tests
pytest --cov=src          # With coverage
```

### Frontend Tests
```bash
cd frontend
npm run test              # Run all tests
npm run test:coverage     # With coverage
```

---

## 📚 Documentation

Detailed documentation available:

- **[API Documentation](api/README.md)** - Endpoints, examples, Postman collections, design patterns
- **[Frontend Documentation](frontend/README.md)** - Setup, components, testing, architecture
- **[Technical Docs](docs/technical_documentation.md)** - System design and architecture
- **[User Guide](docs/user_guide.md)** - End-user instructions

---

## 🛣️ Roadmap

### Current Status ✅
- [x] Backend API with microservices
- [x] Intelligent cost calculation
- [x] Cars & Clients & Rentals full CRUD
- [x] Create rental step-by-step selection stage
- [x] Dashboard with statistics
- [x] Frontend UI with React + TypeScript
- [x] Form validation (Zod)
- [x] Image uploads
- [x] Soft delete with archives
- [x] CLI interface
- [x] Comprehensive testing
- [x] Database migration (PostgreSQL) 

### In Progress 🚧
- [ ] Authentication & authorization (JWT)

### Planned 🎯
- [ ] Dashboard analytics charts
- [ ] Dockeriziation
- [ ] AI integrationw

---

## 🔧 Tech Stack

**Backend:**
- FastAPI - High-performance async API framework
- Python 3.9+ - Core language
- Pydantic - Data validation
- Pytest - Testing framework
- Click - CLI framework

**Frontend:**
- React 18 - UI library
- TypeScript - Type safety
- Vite - Build tool
- TailwindCSS - Styling
- shadcn/ui - Component library
- React Query - Data fetching
- React Hook Form + Zod - Form validation
- Vitest - Testing framework

**Data Storage:**
- PostgreSQL - database
- psycopg2 ORM - data manipulation
- Bulk select operations preventing N+1 query issues
- Configurable history tracking for deleted items
- Media storage for uploaded images

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Ensure all tests pass before submitting:
```bash
# Backend
pytest

# Frontend
cd frontend && npm run test && npm run lint
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Elvin Musayev** - [@M4Sayev](https://github.com/M4Sayev)
- **Eltun Jalilli** - [@EltunLTN](https://github.com/EltunLTN)

---

## 🙏 Acknowledgments

Built as part of an OOP course project, demonstrating:
- Object-oriented programming principles
- Design patterns (Strategy, Decorator, Repository)
- Microservices architecture
- Modern web development practices
- Test-driven development
- Persisting data in the database

---
