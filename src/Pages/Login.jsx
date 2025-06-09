import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassowrd] = useState('')
  const navigate = useNavigate()
   const handleLogin = async (e) => {
    e.preventDefault()
    try{
       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/login`, {
      email : email,
      password : password
     },{
      withCredentials : true,
     })
    setEmail('')
    setPassowrd('')
    console.log("Login Successfully");
    navigate('/')
    
    }catch(error){
      console.log("Login Failed",error.message)      

    }
    }
  return (

   
   <div className="min-h-screen flex items-center justify-center bg-transaprent px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>

        <form className="space-y-4"  onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@example.com"
              className="mt-1 w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
            onChange={(e) => setPassowrd(e.target.value)}

              className="mt-1 w-full px-4 py-2 border  text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>
         <p className='text-gray-900 text-sm' >Don't have an accout ? 
            
            <Link to={'/Signup'} >
            <span className='text-amber-800'>SignUp</span></Link>
             </p>
        <div className="flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase">or</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
