import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
     <header className="bg-transaprent  shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <nav className="space-x-6">
          <Link to="/" className="text-white hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/login" className="text-white hover:text-blue-600 font-medium">
            Login
          </Link>
          <Link to="/Signup" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header
