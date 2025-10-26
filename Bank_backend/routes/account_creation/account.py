# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from config.db import SessionLocal
# from model.account import AccountCreate, AccountResponse
# from config.db import Account 

# router = APIRouter(prefix="/api/account", tags=["Account"])

# # Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/create", response_model=AccountResponse)
# def create_account(account: AccountCreate, db: Session = Depends(get_db)):
#     try:
#         existing_account = db.query(Account).filter(Account.user_id == account.user_id).first()
#         if existing_account:
#             raise HTTPException(
#                 status_code=400,
#                 detail="User already has an account. Only one account type is allowed per user."
#             )

#         new_account = Account(
#             user_id=account.user_id,
#             account_type=account.account_type,
#             account_number=account.account_number,
#             balance=account.balance
#         )

#         db.add(new_account)
#         db.commit()
#         db.refresh(new_account)

#         return new_account

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from config.db import SessionLocal, Account  # import your ORM Account model
from model.account import AccountCreate, AccountBase

router = APIRouter(prefix="/api/account", tags=["Account"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create", response_model=AccountCreate)  # response_model returns user_id + accounts
def create_accounts(request: AccountCreate, db: Session = Depends(get_db)):
    user_id = request.user_id
    created_accounts = []

    for acc in request.accounts:
        # Check if the user already has this account type
        existing_account = db.query(Account).filter(
            Account.user_id == user_id,
            Account.account_type == acc.account_type
        ).first()

        if existing_account:
            # Skip if the user already has this type
            continue

        # Create new account
        new_account = Account(
            user_id=user_id,
            account_type=acc.account_type,
            account_number=acc.account_number,
            balance=acc.balance
        )
        db.add(new_account)
        db.commit()
        db.refresh(new_account)
        created_accounts.append(new_account)

    # Fetch all accounts for this user to return
    all_accounts = db.query(Account).filter(Account.user_id == user_id).all()
    accounts_response = [
        AccountBase(
            account_type=a.account_type,
            account_number=a.account_number,
            balance=a.balance
        )
        for a in all_accounts
    ]

    return {
        "user_id": user_id,
        "accounts": accounts_response
    }