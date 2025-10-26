import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: '',
    number: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: details.name,
          phone: details.number, // backend expects phone
          email: details.email,
          password: details.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.detail);
      } else {
        alert("Success! User ID: " + data.user.id);
        setDetails({ name: "", number: "", email: "", password: "" });
      }
    } catch (err) {
      alert("Request failed: " + err.message);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='h-110 w-110 bg-gray-400 rounded-3xl p-5'>
        <p className='text-2xl font-medium text-center'>Banking Application</p>
        <div className='h-60 flex flex-col justify-between items-start mt-10'>
          <input name="name" placeholder='Enter Name' type='text' value={details.name} onChange={handleChange} className='bg-white h-10 w-full rounded-md pl-3'/>
          <input name="number" placeholder='Enter Phone Number' type='text' value={details.number} onChange={handleChange} className='bg-white h-10 w-full rounded-md pl-3'/>
          <input name="email" placeholder='Enter Email id' type='email' value={details.email} onChange={handleChange} className='bg-white h-10 w-full rounded-md pl-3'/>
          <input name="password" placeholder='Enter password' type='password' value={details.password} onChange={handleChange} className='bg-white h-10 w-full rounded-md pl-3'/>
        </div>
        <button onClick={handleSubmit} className='bg-red-500 h-10 w-full mt-5 rounded-md text-white'>REGISTER</button>
        <p onClick={() => navigate('/Login')} className='text-center mt-3 font-medium text-white cursor-pointer'>Login</p>
      </div>
    </div>
  );
}

export default Register;