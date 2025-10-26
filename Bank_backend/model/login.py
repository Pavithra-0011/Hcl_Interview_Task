from pydantic import BaseModel

class UserLoginSchema(BaseModel):
    username: str  # email or phone
    password: str
