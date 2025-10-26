import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: '', // email or phone
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
    setErrorMsg(""); // reset error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginDetails.username,
          password: loginDetails.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend should return specific error in "detail"
        setErrorMsg(data.detail || "Login failed");
      } else {
        alert("Login successful!");
        setLoginDetails({ username: "", password: "" });
        navigate("/dashboard"); // redirect after login
      }
    } catch (err) {
      setErrorMsg("Request failed: " + err.message);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='h-110 w-110 bg-gray-400 rounded-3xl p-5 flex flex-col justify-between'>
        <p className='text-2xl font-medium text-center'>Login</p>

        {errorMsg && <p className='text-red-600 text-center'>{errorMsg}</p>}

        <input
          name="username"
          placeholder='Email or Phone'
          type='text'
          value={loginDetails.username}
          onChange={handleChange}
          className='bg-white h-10 w-full rounded-md pl-3 mt-5'
        />
        <input
          name="password"
          placeholder='Password'
          type='password'
          value={loginDetails.password}
          onChange={handleChange}
          className='bg-white h-10 w-full rounded-md pl-3 mt-3'
        />

        <button
          onClick={handleSubmit}
          className='bg-red-500 h-10 w-full mt-5 rounded-md text-white'
        >
          LOGIN
        </button>

        <p
          onClick={() => navigate('/')}
          className='text-center mt-3 font-medium text-white cursor-pointer'
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;