from src.db.connection import get_connection

from src.auth.security import hash_password
from src.utils.entity import generate_id

import logging

logger = logging.getLogger(__name__)

def create_tables():
    conn = get_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            # create clients table
            logger.info("Creating clients table")
            cur.execute(
                    """
                        CREATE TABLE IF NOT EXISTS clients (
                            client_id VARCHAR(100) PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            phone VARCHAR(20)
                        );
                    """
                    )
            # create deleted client table
            logger.info("Creating deleted clients table")
            cur.execute(
                    """
                        CREATE TABLE IF NOT EXISTS deleted_clients (
                            client_id VARCHAR(100) PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            phone VARCHAR(20),
                            deletion_date TIMESTAMP
                        );
                    """
                    )
            
            # create cars table 
            logger.info("Creating cars table")
            cur.execute(
                    """
                        CREATE TABLE IF NOT EXISTS cars (
                            vehicle_id VARCHAR(100) PRIMARY KEY,
                            brand VARCHAR(255) NOT NULL,
                            model VARCHAR(255) NOT NULL,
                            daily_rate NUMERIC(200, 2), 
                            car_type VARCHAR(255) NOT NULL,
                            seats INTEGER,
                            is_available BOOLEAN DEFAULT TRUE,
                            image_url TEXT DEFAULT '/media/cars/car_default.jpg'
                        );
                    """
                    )
            # create deleted cars table 
            logger.info("Creating deleted cars table")
            cur.execute(
                    """
                        CREATE TABLE IF NOT EXISTS deleted_cars (
                            vehicle_id VARCHAR(100) PRIMARY KEY,
                            brand VARCHAR(255) NOT NULL,
                            model VARCHAR(255) NOT NULL,
                            daily_rate NUMERIC(50, 2), 
                            car_type VARCHAR(255) NOT NULL,
                            seats INTEGER,
                            is_available BOOLEAN DEFAULT TRUE,
                            image_url TEXT DEFAULT '/media/cars/car_default.jpg',
                            deletion_date TIMESTAMP
                        );
                    """
                    )
            # create rentals table
            logger.info("Creating rentals table")
            cur.execute(
                    """
                        CREATE TABLE IF NOT EXISTS rentals (
                            rental_id VARCHAR(100) PRIMARY KEY,
                            car_id VARCHAR(255) REFERENCES cars(vehicle_id) ON DELETE CASCADE,
                            client_id VARCHAR(255) REFERENCES clients(client_id) ON DELETE CASCADE,
                            start_date TIMESTAMP,
                            end_date TIMESTAMP DEFAULT NULL,
                            seats INTEGER,
                            total_cost NUMERIC(50, 2),
                            is_active BOOLEAN DEFAULT FALSE
                        );
                    """
                    )
            # create users table
            logger.info("Creating users table")

            cur.execute(
                    """
                        CREATE TABLE IF NOT EXISTS users (
                            id VARCHAR(100) PRIMARY KEY,
                            username VARCHAR(255) UNIQUE NOT NULL,
                            hashed_password TEXT NOT NULL,
                            is_superuser BOOLEAN DEFAULT FALSE
                        )
                    """
                    )
        
            logger.info("Creating default superuser if it does not exist")
            id = generate_id()
            default_password = hash_password("admin123")
            cur.execute("SELECT * FROM users WHERE is_superuser = TRUE")

            if cur.rowcount == 0:
                cur.execute(
                    "INSERT INTO users (id, username, hashed_password, is_superuser) VALUES (%s, %s, %s)",
                    (id ,"admin", default_password, True)
                )
                logger.info("Superuser 'admin' created with default password 'admin123'")

            conn.commit()
            logger.info("Tables created successfully")
    except Exception as e:
        print(f"Error creating tables: {e}")
    finally:
        conn.close()
create_tables()