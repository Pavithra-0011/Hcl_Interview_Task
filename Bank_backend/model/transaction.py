from pydantic import BaseModel

class TransactionBase(BaseModel):
    from_account: str
    to_account: str
    amount: float
    status: str = "success"

class TransactionCreate(TransactionBase):
    user_id: int

class TransactionResponse(TransactionBase):
    id: int
    class Config:
        orm_mode = True
