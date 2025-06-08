import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const navigate = useNavigate()



  const handleWithGoogle = useGoogleLogin({
    onSuccess : async (tokenResponse) => {
      try{
        console.log('Google Token Response',tokenResponse)
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
          headers : {
            Authorization : `Bearer ${tokenResponse.access_token}`
          }
        })

        console.log("google User Info",res.data);
          console.log('access_token',tokenResponse.access_token);


        const backendRes = await axios.post('/api/user/google-auth', {
          token : null,
          userInfo : res.data
        },{
    withCredentials: true
})
         console.log("Backend Google Auth Response:",backendRes.data);
         navigate('/')
      }catch(error){
        console.log('Google Login Failed', error.message);
        alert('Google Login Failed: ' + error.message);
      }
    },
      onError: (error) => {
      console.log('Google Login Error', error);
      alert('Google Login Failed');
    },
  })

  const handleSubmit =  async (e) => {
    e.preventDefault()
    try{
      const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isEmailFormatValid) {
        alert("Please enter a valid email format");
        return;
      }
      await axios.post('/api/user/register', {
        fullName : fullName,
        email : email,
        password : password
      })
      setFullName('')
      setEmail('')
      setPassowrd('')
      console.log("SignUp successfully");
      navigate('/login')
      
    }catch(error){
      console.log("SignUp failed",error.message);
      alert("SignUp failed: " + error.message);
    }
   
    
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create Your Account
        </h2>

        <form className="space-y-4"  onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-900">Full Name</label>
            <input
            value={fullName}
              type="text"
              placeholder="John Doe"
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full px-4 text-black py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="mt-1 w-full px-4 py-2 border text-black  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2  text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className='text-gray-900 text-sm' > Already have an accout ? 
            
            <Link to={'/login'} >
            <span className='text-amber-800'>Login</span></Link>
             </p>
            
        <div className="flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase">or</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>



        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
          onClick={() => handleWithGoogle()}
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
  );
};


export default SignUp
