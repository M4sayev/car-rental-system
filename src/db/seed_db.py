import json 
from connection import get_connection
import logging

logger = logging.getLogger(__name__)

conn = get_connection()

# seed clients

with open("data/clients.json", "r") as f:
    clients = json.load(f)

logger.info("Seeding sample clients...")
for client in clients:        
    with conn.cursor() as cur:
        cur.execute(
                """
                INSERT INTO clients (
                    client_id, name, email, phone
                )
                VALUES(%s, %s, %s, %s)
                ON CONFLICT (client_id) DO NOTHING
                """
                , 
                (
                    client["client_id"], 
                    client["name"], 
                    client["email"], 
                    client["phone"]
                )
            ) 


# seed deleted clients

with open("deleted_data/clients.json", "r") as f:
    deleted_clients = json.load(f)

logger.info("Seeding deleted clients...")
for d_client in deleted_clients:        
    with conn.cursor() as cur:
        cur.execute(
                """
                INSERT INTO deleted_clients (
                    client_id, name, email, 
                    phone, deletion_date
                )
                VALUES(%s, %s, %s, %s, %s)
                ON CONFLICT (client_id) DO NOTHING
                """
                , 
                (
                    d_client["client_id"],
                    d_client["name"],
                    d_client["email"], 
                    d_client["phone"], 
                    d_client["deletion_date"]
                )
            ) 

# seed car data 

with open("data/cars.json", "r") as f:
    cars = json.load(f)

for car in cars:
    with conn.cursor() as cur:
        cur.execute(
                """
                INSERT INTO cars (
                        vehicle_id, brand, model, daily_rate,
                        car_type, seats, is_available, image_url
                )
                VALUES(%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (vehicle_id) DO NOTHING
                """,
                (
                    car["vehicle_id"], 
                    car["brand"], 
                    car["model"], 
                    car["daily_rate"], 
                    car["car_type"], 
                    car["seats"], 
                    car["is_available"], 
                    car["image_url"]
                )
            )
        
# seed deleted cars 

with open("deleted_data/cars.json", "r") as f:
    cars = json.load(f)

for car in cars:
    with conn.cursor() as cur:
        cur.execute(
                """
                INSERT INTO deleted_cars (
                        vehicle_id, brand, model, daily_rate,
                        car_type, seats, is_available, image_url, deletion_date
                )
                VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (vehicle_id) DO NOTHING
                """,
                (
                    car["vehicle_id"], 
                    car["brand"], 
                    car["model"], 
                    car["daily_rate"], 
                    car["car_type"], 
                    car["seats"], 
                    car["is_available"], 
                    car["image_url"],
                    car["deletion_date"]
                )
            )
        
# seed rentals

with open("data/rentals.json", "r") as f:
    rentals = json.load(f)

for rental in rentals:
    with conn.cursor() as cur:
        cur.execute(
                """
                INSERT INTO rentals (
                    rental_id, car_id, client_id,
                    start_date, end_date, total_cost, is_active
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (rental_id) DO NOTHING 
                """,
                (
                    rental["rental_id"],
                    rental["car"]["vehicle_id"],
                    rental["client"]["client_id"],
                    rental["start_date"],
                    rental["end_date"],
                    rental["total_cost"],
                    rental["is_active"]
                )
            )

conn.commit()
conn.close()
