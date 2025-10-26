# Hcl_Interview_Task

API DOCUMENTATION:
USER REGISTRATION - (method Post) 
Database : MONGODB

1. Http request type : Method POST
   sample URL : http://127.0.0.1:8000/api/auth/register
   
   ****request body*****
   {
    "headers":
   {
      "Content-Type": "application/json",
   },
  "body":
{
  "name": "Pavithra",
  "email": "pavithra@example.com",
  "password": "mypassword123",
  "phone": "8838289219"
}
}

****Error response*****
//Error Response
{
  "error": "Email or phone already exists"
}

//Success Response
{
  "message": "Personal details submitted successfully",
  "user": {
    "id": "652f1b4e6a8a9c12d8f4d8a3",
    "name": "Pavithra",
    "email": "pavithra@example.com",
    "phone": "8838289219"
  },
  //
}

KYC DOCS:
request headers:
{
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>
}
request body
{
  "user_id": "652f1b4e6a8a9c12d8f4d8a3",
  "kyc_doc": "<binary file data>"
}

response :
Status : successfull
{
  "message": "KYC document uploaded successfully",
  "user_id": "652f1b4e6a8a9c12d8f4d8a3",
  "kyc_status": "pending"
}
Status Error:
{
  "error": "Invalid file format. Only PDF or JPEG allowed."
}

















 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."









   




