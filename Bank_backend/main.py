from fastapi import FastAPI
from routes.register.register import Register_router
from routes.login.login import Login_router
from fastapi.middleware.cors import CORSMiddleware 
from routes.account_creation.account import router
# from model import user_model, account_model, loan_model, transaction_model

app = FastAPI(title="Banking API")


origins = [
    "http://localhost:5174",  # your React dev server
    "http://localhost:5173",  # your React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # <-- allow this origin
    allow_credentials=True,
    allow_methods=["*"],          # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # allow all headers
)

# Include the router
app.include_router(Register_router)
app.include_router(Login_router)
app.include_router(router)
