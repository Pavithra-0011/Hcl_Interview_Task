import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register/register.jsx'
import LoginComponent from './pages/Login/login.jsx'
import DashBoardComponent from './pages/Dashboard/dashboard.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Router> */}
      <Routes>
        <Route path="/" element={<Register/>} /> 
        <Route path="/Login" element={<LoginComponent/>} /> 
        <Route path="/dashboard" element={<DashBoardComponent/>} /> 
      </Routes>
    {/* </Router> */}
     {/* <Register/> */}
    </>
  )
}

export default App
