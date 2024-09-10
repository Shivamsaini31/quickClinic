// src/component/doctor/header/DoctorHeader.jsx
import React, { useState } from 'react';
import './header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DoctorHeader = () => {
  const [showCard, setShowCard] = useState(false);

  const data = localStorage.getItem('authState');
  const fetchdata = JSON.parse(data);
  const id = fetchdata.user._id;

  const handleIconClick = () => {
    setShowCard(!showCard);
  };

 
  return (
    <header className="doctor-navbar">
      <div className="container">
        {/* Logo Section */}
        <a className="navbar-brand" href={`/doctor/dashbaord/${id}`}>Doctor Dashboard</a>
        
        {/* Navigation Links */}
        <nav className="nav-links">
          <Link className="nav-link" to={`/doctor/dashboard/${id}/appointments`}>Appointment History</Link>
          <Link className="nav-link" to={`/doctor/dashboard/${id}/schedule`}>Schedule</Link>
          <Link className="nav-link" to={`/doctor/dashboard/${id}/earnings`}>Earnings</Link>
          <Link className="nav-link" to={`/doctor/dashboard/${id}/leave`}>Leave</Link>
        </nav>

        {/* Profile Section */}
        <div className="profile-section">
          <FaUserCircle className="profile-icon" onClick={handleIconClick} />
          {showCard && (
            <div className="user-info-card">
              <h3>User Info</h3>
             
              <p>Name: {fetchdata.user.name}</p>
              <p>Email: {fetchdata.user.email}</p>
              <p>Phone No:{fetchdata.user.phoneNumber}</p>
              <Link className="update-button" to={`/user/${id}/update`}>Update Info</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
