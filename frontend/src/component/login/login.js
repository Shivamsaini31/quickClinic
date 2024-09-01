import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling
// Import Material-UI components and icons
import { Button } from '@mui/material';
import { auth, provider, signInWithPopup } from '../firebase/firebase';
import { Google, Brightness4, Brightness7 } from '@mui/icons-material';
import logo from './logo.svg';
import signupVisual from './login.png'; // Adjust your image path accordingly
import { useAuth }from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); 
const [email,setemail]=useState('');
const [password,setpassword]=useState('');

const onsubmit = async (e) => {
  e.preventDefault();
  
  try {
    const data  = await login(email, password);
    console.log("login page data is here", data);
    
    if (data.success) {
      // If the login is successful, navigate to the home page
      const id=data.user._id;
      const role=data.user.role;
      console.log("Login successful, redirecting to home page...",data);
      if(role==='patient'){
        navigate(`/patient/dashboard/${id}`);
      }
      else {
        navigate(`/doctor/dashboard/${id}`);
      }
      
    } else {
      // If login fails (e.g., wrong credentials), navigate to the signup page
     alert("Login failed,try again ");
      navigate('/login');
    }
  } catch (error) {
    console.error("Error during login: ", error);
    // Optionally, navigate to an error page or display an error message to the user
  }
};
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const email=user.email;
    const {data}=await axios.post("http://localhost:5000/api/v1/checkuser",{
      email
    })
    if(data.success){
      const newAuthState = {
        success: true,
         user: data.user,
     };
      localStorage.setItem('authState', JSON.stringify(newAuthState));
      navigate('/home');
    }
    else {
      alert("this email is not register")
      navigate('/signup');
    }
   
  } catch (error) {
    console.error("Error during Google Login: ", error);
  }
};


  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`login-page-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle Icon */}
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </div>

      {/* Left Side: Form Section */}
      <div className="form-container">
        <div className="form-content">
          <div className="logo">
            {/* Replace with your logo */}
            <img src={logo} alt="Logo" />
          </div>
          <h2>Login 🔑</h2>
          <p>Enter your email and password to create your account</p>
          <Button className="google-signup" onClick={handleGoogleLogin} startIcon={<Google />}>
            Login with Google
          </Button>
          <div className="divider">Or sign up with email</div>
          <form className="signup-form">
            <input type="email" onChange={(e)=>setemail(e.target.value)} placeholder="Email" className="input-field" />
            <input type="password"  onChange={(e)=>setpassword(e.target.value)} placeholder="Password" className="input-field" />
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" onClick={onsubmit} className="signup-button">Login</button>
          </form>
          <p className="login-link">
             <a href='./signup' > Don't have account ? Signup </a>
          </p>
          <p className="login-link">
             <a href='./forgot' > Forgot password </a>
          </p>
        </div>
      </div>

      {/* Right Side: Image Section */}
      <div className="image-container">
        <img src={signupVisual} alt="Signup Visual" className="signup-image" />
      </div>
    </div>
  );
};

export default LoginPage;
