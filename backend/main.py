from routers.auth import router as auth_router
from fastapi import FastAPI
from database import engine, Base
from models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router)

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