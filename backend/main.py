from fastapi import FastAPI
from database import engine


app = FastAPI()


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Finflow API"
    }


@app.get("/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            return {
                "message": "Database connection successful"
            }

    except Exception as error:
        return {
            "message": "Database connection failed",
            "error": str(error)
        }