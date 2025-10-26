from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from config.db import SessionLocal, User
from model.register import UserCreateSchema

Register_router = APIRouter(prefix="/api/auth", tags=["auth"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@Register_router.post("/register")
def register(user: UserCreateSchema = Body(...), db: Session = Depends(get_db)):
    # Add new user
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password,
        phone=user.phone
    )

    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email or phone already exists")
    
    return {
        "message": "Personal details submitted successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "phone": new_user.phone
        }
    }