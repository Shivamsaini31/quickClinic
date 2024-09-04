import React, { useState } from "react";
import "./header.css"; // Import your custom CSS for additional styles
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const PatientHeader = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const data = localStorage.getItem('authState');
  const fetchdata = JSON.parse(data);
  const id = fetchdata.user._id; // Correctly using useParams to get the id
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    setShowProfileCard(prev => !prev);
  };

  return (
    <header className="custom-navbar">
      <div className="container">
        {/* Logo Section */}
        <Link className="navbar-brand" to="/home">
          Quick Clinic
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button className="nav-link" onClick={() => navigate(`/patient/dashboard/${id}/appointment`)}>
            Book Appointment
          </button>
          <Link className="nav-link" to={`/patient/dashboard/${id}/history`}>
            Appointment History
          </Link>
          <Link className="nav-link" to={`/patient/dashboard/${id}/cancel/postpond`}>
            Cancel/Postpone
          </Link>
        </nav>

        {/* User Profile Section */}
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-img"
            onClick={handleProfileIconClick}
          />
          <span className="profile-name">{fetchdata.user.name}</span>
          
          {/* Profile Card */}
          {showProfileCard && (
            <motion.div 
              className="user-info-card"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
               
              <h6>Name: {fetchdata.user.name}</h6>
              <h6>Email: {fetchdata.user.email}</h6>
              <h6>Phone No:{fetchdata.user.phoneNumber}</h6>
              <button className="update-button">Update Info</button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
