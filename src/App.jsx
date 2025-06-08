import React from 'react'
import { Route,   BrowserRouter , Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/SignUp.jsx'
import Header from './Pages/Header.jsx'
import Login from './Pages/Login.jsx'

const App = () => {
  return (
    <div className='w-full min-h-screen bg-gray-600 text-white  text-center py-5' >
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/Signup" element={<SignUp />}  />
        <Route path="/login" element={<Login />}  />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
