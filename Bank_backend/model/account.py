from pydantic import BaseModel
from typing import List

class AccountBase(BaseModel):
    account_type: str
    account_number: str
    balance: float

class AccountCreate(BaseModel):
    user_id: int
    accounts: List[AccountBase] 

class AccountResponse(AccountBase):
    id: int

    model_config = {
        "from_attributes": True  # instead of orm_mode
    }

