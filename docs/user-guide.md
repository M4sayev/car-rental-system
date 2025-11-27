# Car Rental Management System – User Guide

## Sprint 1 – Setup and Usage

This guide provides instructions for setting up, running, and testing the Car Rental Management System.

---

## 1. Prerequisites

- **Python 3.9+** installed
- **pip** package manager available
- Recommended: virtual environment tool (`venv`)

---

## 2. Cloning the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/M4sayev/car-rental-system.git
cd car-rental-system
```

---

## 3. Creating a Virtual Environment

Create a virtual environment in the project folder:

```bash
python -m venv venv
```

---

## 4. Activating the Virtual Environment

**Windows (CMD):**

```cmd
venv\Scripts\activate
```

**Windows (PowerShell):**

```powershell
venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Once activated, your terminal prompt will show `(venv)`.

---

## 5. Installing Dependencies

Install required Python packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

---

## 6. Running the Application

Start the application using the main script:

```bash
python src/main.py
python run.py
```

Currently, `main.py` serves as the entry point to demonstrate class interactions and basic CRUD operations.

---

## 7. Data Storage

The application uses JSON files for persistence:

- `data/cars.json` – Stores car information
- `data/clients.json` – Stores client information
- `data/rentals.json` – Stores rental records

Ensure the `data/` folder exists before running the application.

---

## 8. Running Tests

Unit tests are located in the `tests/` folder and use `pytest`. Run all tests with:

```bash
pytest
```

Tests cover:

- Model behaviors (inheritance, polymorphism, encapsulation)
- CRUD operations in the repository
- Rental cost calculations and composition integrity

---

## 9. Logging

Logging is implemented using Python's `logging` module.

- Operations such as creating objects or writing to JSON files are logged at INFO level.
- Logs can be viewed in the console during execution.

---

## 10. Next Steps

- Extend CRUD operations to include Update and Delete.
- Add validation and error handling for business rules.
- Develop a CLI or GUI for user interaction.
- Expand tests for edge cases and additional scenarios.
