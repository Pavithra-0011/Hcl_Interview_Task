from pydantic import BaseModel, EmailStr

# Request model for user registration
class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str

# Response model for successful registration
class UserResponseSchema(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
