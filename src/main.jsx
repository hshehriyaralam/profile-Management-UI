import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='650171672012-41rj4jpgd5jkej4vaikb6hjs34q021v0.apps.googleusercontent.com' >
    <App />
  </GoogleOAuthProvider>
  
)
