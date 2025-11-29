from src.models.car import Car
from src.models.client import Client
from src.models.rental import Rental

from datetime import datetime, timedelta

# the count of try-except block
VALIDATION_TEST_COUNT = 4

def test_validation():
    # to print that the validation succeeded or failed at the end
    validation_count = 0

    print("\n--- CLIENT VALIDATION TEST ---")
    try:
        Client("CL003", "Alice", "bademail", "+1234567890")
    except ValueError as e:
        print(f"Caught client email error: {e}")
        validation_count += 1

    try:
        Client("CL004", "", "alice@example.com", "+1234567890")
    except ValueError as e:
        print(f"Caught client name error: {e}")
        validation_count += 1

    print("\n--- CAR VALIDATION TEST ---")
    try:
        Car("C004", "Ford", "Escape", 60.0, "SUV", -5)
    except ValueError as e:
        print(f"Caught car seats error: {e}")
        validation_count += 1

    print("\n--- RENTAL VALIDATION TEST ---")
    client = Client("CL005", "Bob", "bob@example.com", "+1987654321")
    car = Car("C005", "Honda", "Civic", 40.0, "Sedan", 5)

    # Invalid rental: end_date before start_date
    try:
        Rental("R002", car, client, datetime.now(), datetime.now() - timedelta(days=1))
    except ValueError as e:
        print(f"Caught rental date error: {e}")
        validation_count += 1

    print("\n")

    if (VALIDATION_TEST_COUNT == validation_count):
        print("VALIDATION TEST PASSED SUCCESSFULLY!!!")
    else:
        print("Something went wrong with validation")

    print("\n\n")

test_validation()