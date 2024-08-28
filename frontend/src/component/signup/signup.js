import React, { useState } from 'react';
import './signup.css'; // Import the CSS file for styling
import axios from 'axios';
// Import Material-UI components and icons
import { Button } from '@mui/material';
import { Google, Brightness4, Brightness7 } from '@mui/icons-material';
import logo from './logo.svg';
import signupVisual from './doctor.png'; // Adjust your image path accordingly
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State for role selection
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigate();

  const onSignup = async (e) => {
e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/register', {
        name,
        email,
        password,
        role,
      });
      console.log("data is here",data);
      if (data.success) {
        login(email, password);
        navigation('/');
      } else {
        console.log(data);
      }
    } catch (error) {
      
      alert(error.response.data.message);
      // Handle signup error (e.g., show an error message)
    }
  };

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
          <h2>Sign up 🔑</h2>
          <p>Enter details to create your account</p>
          <Button className="google-signup" startIcon={<Google />}>
            Sign up with Google
          </Button>
          <div className="divider">Or sign up with email</div>
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            <div className="name-fields">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="input-field"
                value={name}
              />
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
              value={email}
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
              value={password}
            />

            {/* Role Selection */}
            <div className="role-selection">
              <label>Select your role:</label>
              <select
                className="input-field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" onClick={onSignup} className="signup-button">
              Sign up
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login now</a>
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

export default SignupPage;
