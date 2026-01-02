import psycopg2 
from dotenv import load_dotenv
from psycopg2 import OperationalError
import os

load_dotenv()

def get_connection():
    """
    Returns a new connection to the PostgreSQL database.
    """
    try:
        conn = psycopg2.connect(
            # host=os.getenv("DB_HOSTNAME"),
            # for local running
            host="localhost",
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT")
        )
        return conn
    except OperationalError as e:
        print(f"Error connecting to database: {e}")
        return None
