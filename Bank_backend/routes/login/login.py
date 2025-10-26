from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from config.db import SessionLocal, User
from model.login import UserLoginSchema

Login_router = APIRouter(prefix="/api/auth", tags=["auth"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@Login_router.post("/login")
def login(user: UserLoginSchema = Body(...), db: Session = Depends(get_db)):

    # Check if username is email or phone
    existing_user = db.query(User).filter(
        (User.email == user.username) | (User.phone == user.username)
    ).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="Email or phone not found")

    # Check password
    if existing_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Return success response
    return {
        "message": "Login successful",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "phone": existing_user.phone
        }
    }
