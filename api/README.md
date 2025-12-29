# 🚀 Car Rental System - API Documentation

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Postman](https://img.shields.io/badge/Postman-Collections-orange.svg)](https://www.postman.com/)

REST API built with FastAPI implementing microservices architecture, design patterns, and intelligent cost calculation strategies.

---

## 🎯 Features

### Core Functionality

- ✅ **Cars Management** - CRUD operations with image upload and availability tracking
- ✅ **Clients Management** - Complete client lifecycle management
- ✅ **Rentals System** - Smart rental creation and completion with cost calculation
- ✅ **Dashboard** - Overview statistics and recent activity tracking

### Technical Features

- ⚡ **FastAPI** - High-performance async framework with auto-generated docs
- 🎨 **Design Patterns** - Strategy and Decorator patterns for rental cost calculation
- 📦 **Repository Pattern** - PostgreSQL-based storage with configurable history size and ORM data manipulation
- 🖼️ **Media Handling** - Static file serving for car images
- 🔒 **CORS** - Configured for frontend integration
- 📝 **Postman Collections** - 4 collections for complete API testing

---

## 🚀 Quick Start

### Start API Server

```bash
# From project root
python run_api.py
```

API available at: `http://localhost:8000` or whatever host you set in the run_api.py in the root directory (in my case 127.0.0.1:8000)

### Access Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📋 API Endpoints

### Cars

| Method   | Endpoint                                  | Description                     |
| -------- | ----------------------------------------- | ------------------------------- |
| `GET`    | `/cars`                                   | Get all cars                    |
| `GET`    | `/cars/available`                         | Get available cars only         |
| `GET`    | `/cars/available?search=Toyota`           | Search for available cars       |
| `GET`    | `/cars/deleted`                           | Get deleted cars archive        |
| `GET`    | `/cars/{vehicle_id}`                      | Get specific car                |
| `GET`    | `/cars/{vehicle_id}/rental-cost?days={n}` | Calculate rental cost           |
| `POST`   | `/cars`                                   | Add new car (with image upload) |
| `PATCH`  | `/cars/{vehicle_id}`                      | Update car details              |
| `DELETE` | `/cars/{vehicle_id}`                      | Delete car (soft delete)        |

### Clients

| Method   | Endpoint               | Description                 |
| -------- | ---------------------- | --------------------------- |
| `GET`    | `/clients`             | Get all clients             |
| `GET`    | `/clients?search=Isi`  | Search for clients          |
| `GET`    | `/clients/deleted`     | Get deleted clients archive |
| `GET`    | `/clients/{client_id}` | Get specific client         |
| `POST`   | `/clients`             | Add new client              |
| `PATCH`  | `/clients/{client_id}` | Update client               |
| `DELETE` | `/clients/{client_id}` | Delete client (soft delete) |

### Rentals

| Method  | Endpoint                        | Description             |
| ------- | ------------------------------- | ----------------------- |
| `GET`   | `/rentals`                      | Get all rentals         |
| `GET`   | `/rentals?search=R001`          | Search for a rental     |
| `GET`   | `/rentals/active`               | Get active rentals only |
| `POST`  | `/rentals`                      | Create new rental       |
| `PATCH` | `/rentals/{rental_id}/complete` | Complete rental         |
| `DELETE` | `/rentals/{rental_id}`         | Delete rental           |

### Dashboard

| Method | Endpoint                    | Description                                                    |
| ------ | --------------------------- | -------------------------------------------------------------- |
| `GET`  | `/dashboard/overview`       | Get statistics (available cars, total clients, active rentals) |
| `GET`  | `/dashboard/recent-rentals` | Get 5 most recent rentals with details                         |

### Media

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| `GET`  | `/media/cars/{filename}` | Serve car images |

---

## 📝 Request/Response Examples

### Create Car (with Image)

**Request:**

```http
POST /cars
Content-Type: multipart/form-data

brand: Toyota
model: Camry
daily_rate: 50.00
car_type: Sedan
seats: 5
image_url: [file upload]
```

**Response:**

```json
{
  "message": "Car has been successfully created",
  "data": {
    "vehicle_id": "aa8bdcff-37a1-4728-a69b-8840d40ba78f",
    "brand": "Toyota",
    "model": "Camry",
    "daily_rate": 50.0,
    "car_type": "Sedan",
    "seats": 5,
    "is_available": true,
    "image_url": "/media/cars/08f9fdc6-d07f-4fba-ad62-c1f4625b5f4b_toyota_camry.jpg"
  }
}
```

### Calculate Rental Cost

**Request:**

```http
GET /cars/C001/rental-cost?days=10
```

**Response:**

```json
{
  "message": "success",
  "data": {
    "base_cost": 500.0,
    "final_cost": 425.0,
    "discount_applied": "Long-term rental (15% off)",
    "days": 10
  }
}
```

### Create Rental

**Request:**

```json
POST /rentals

{
  "car_id": "C001",
  "client_id": "CL001",
  "start_date": "2025-12-10T10:00:00"  // Optional, defaults to now
}
```

**Response:**

```json
{
  "message": "Rental has been successfully created",
  "data": {
    "rental_id": "1d9242ab-0b31-4efb-bc4a-2e908a25c269",
    "car": {
      "vehicle_id": "C001",
      "brand": "Toyota",
      "model": "Camry",
      "daily_rate": 50.0,
      "car_type": "Sedan",
      "seats": 5,
      "is_available": false
    },
    "client": {
      "client_id": "CL001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "start_date": "2025-12-10T10:00:00",
    "end_date": null,
    "is_active": true,
    "total_cost": 50.0
  }
}
```

### Dashboard Overview

**Request:**

```http
GET /dashboard/overview
```

**Response:**

```json
{
  "message": "success",
  "data": {
    "available_cars": 15,
    "total_clients": 42,
    "active_rentals": 8
  }
}
```

---

## 🎨 Design Patterns

### Strategy Pattern - Rental Cost Calculation

Different cost calculation strategies based on car type:

```python
# Standard cars
class StandardCarCost(RentalCostStrategy):
    def calculate_cost(self, car: Car, days: int) -> float:
        return car.daily_rate * days

# SUVs get 20% premium
class SUVRentalCost(RentalCostStrategy):
    SUV_COST_COEFFICIENT = 1.2
    def calculate_cost(self, car: Car, days: int) -> float:
        return car.daily_rate * days * self.SUV_COST_COEFFICIENT
```

### Decorator Pattern - Cost Modifiers

Stackable discounts and fees:

```python
# Long-term discount (7+ days = 15% off)
class LongTermRentalCost(CostDecorator):
    def calculate_cost(self, car: Car, days: int) -> float:
        base_cost = self._wrapped.calculate_cost(car, days)
        if days >= 7:
            return base_cost * 0.85
        return base_cost

# Holiday discount (10% off on Azerbaijan holidays)
class HolidayDiscount(CostDecorator):
    az_holidays = holidays.country_holidays('AZ')
    HOLIDAY_DISCOUNT = 10

    def calculate_cost(self, car: Car, days: int) -> float:
        current_date = datetime.now().date()
        base_cost = self._wrapped.calculate_cost(car, days)

        if current_date in self.az_holidays:
            return base_cost * 0.9
        return base_cost
```

**Example combination:**

```
SUV + Long-term + Holiday = 20% premium - 15% discount - 10% discount
```

---

## 🏗️ Architecture
### Modular Monolith with Service Layer Pattern

```
api/
├── main.py                      # FastAPI app with CORS & static files
├── dependencies.py              # Service instances
├── routes/                      # Route handlers
│   ├── cars.py                  # Cars endpoints
│   ├── clients.py               # Clients endpoints
│   ├── rentals.py               # Rentals endpoints
│   └── dashboard.py             # Dashboard endpoints
├── schemas/                     # Pydantic models
│   ├── car.py
│   ├── client.py
│   ├── rental.py
│   ├── dashboard.py
│   └── response.py
├── types/                       # Type aliasing
│    └── types.py
├── utils/                       # utility functions (save_image, deserialize,...)
│   ├── file_utils.py
│   └── data_utils.py
└── collections/                 # Postman collections
    ├── Cars.postman_collection.json
    ├── Clients.postman_collection.json
    ├── Rentals.postman_collection.json
    └── Dashboard.postman_collection.json
frontend/
src/
├── models/                      # Domain models
│   ├── car.py
│   ├── client.py
│   ├── rental.py
│   └── strategies/              # Cost calculation strategies
│       ├── rental_cost_interface.py
│       └── decorator_strategy.py
├── repositories/                # Data access layer
│   ├── concrete_repo.py         # PostgreSQL repository
│   ├── base_repo.py             # abstract base PostgreSQL repository
│   └── constants.py             # History size configs
└── services/                    # Business logic
    ├── car_service.py
    ├── client_service.py
    └── rental_service.py
```

## 🧪 Testing with Postman

### Import Collections

1. Open Postman
2. Import from `api/collections/`
3. 4 collections available:
   - **Cars Collection** - All car operations
   - **Clients Collection** - All client operations
   - **Rentals Collection** - Rental workflows
   - **Dashboard Collection** - Dashboard endpoints

### Environment Variables

Create environment in Postman:

```json
{
  "base_url": "http://localhost:8000",
  "car_id": "{{saved_car_id}}",
  "client_id": "{{saved_client_id}}",
  "rental_id": "{{saved_rental_id}}"
}
```

## ⚙️ Configuration

### CORS Settings

Frontend origins configured in `main.py`:

```python
origins = [
    "http://localhost:5173",   # Vite dev server
    "http://127.0.0.1:5173",
]
```

### Repository History Size

Configure in `src/repositories/constants.py`:

```python
CAR_HISTORY_SIZE = 50        # Track last 50 deleted cars
CLIENT_HISTORY_SIZE = 100    # Track last 100 deleted clients
RENTAL_HISTORY_SIZE = 200    # Track last 200 deleted rentals
```

### Media Storage

Car images saved to:

```
media/
└── cars/
    └── {uuid}_{filename}
```

Accessible via: `http://localhost:8000/media/cars/{filename}`

---

## 📊 Data Models

### Car

```json
{
  "vehicle_id": "C001", // or UUID format
  "brand": "Toyota",
  "model": "Camry",
  "daily_rate": 50.0,
  "car_type": "Sedan", // Can be any string
  "seats": 5,
  "is_available": true,
  "image_url": "/media/cars/toyota_camry.jpg"
}
```

### Client

```json
{
  "client_id": "CL001", // or UUID format
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

### Rental

```json
{
  "rental_id": "R001", // or UUID format
  "car": {
    "vehicle_id": "C001",
    "brand": "Toyota",
    "model": "Camry",
    "daily_rate": 50.0,
    "car_type": "Sedan",
    "seats": 5,
    "is_available": false
  },
  "client": {
    "client_id": "CL001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "start_date": "2025-10-19T15:16:25.397305",
  "end_date": "2025-12-01T15:30:00", // null if active
  "total_cost": 510.0,
  "is_active": false
}
```

**Note:** IDs can be either predefined (e.g., "C001", "CL001") or auto-generated UUIDs (e.g., "aa8bdcff-37a1-4728-a69b-8840d40ba78f")

---

## 🔧 Error Handling

Standard error responses:

```json
{
  "detail": "Car with id CAR-123 not found"
}
```

Common status codes:

- `200` - Success
- `400` - Bad request (e.g., car not available)
- `404` - Resource not found
- `500` - Internal server error

---

## 🐛 Troubleshooting

**Port 8000 in use:**

```bash
# Change port in run_api.py
uvicorn.run(app, host="0.0.0.0", port=8000)
```

**CORS errors:**

```python
# Add your frontend URL to origins list in main.py
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

**Media files not serving:**

```bash
# Ensure media directory exists
mkdir -p media/cars
```

---

## 📄 License

MIT License
