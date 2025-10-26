from pydantic import BaseModel

class LoanBase(BaseModel):
    loan_type: str
    amount: float
    status: str = "pending"

class LoanCreate(LoanBase):
    user_id: int

class LoanResponse(LoanBase):
    id: int
    class Config:
        orm_mode = True
