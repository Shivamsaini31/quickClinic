// src/component/doctor/header/DoctorHeader.jsx
import React from 'react';
import './header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DoctorHeader = () => {
  const id=useParams.id;
  return (
    <header className="doctor-navbar">
      <div className="container">
        {/* Logo Section */}
        <a className="navbar-brand" href="/">Doctor Dashboard</a>
        
        {/* Navigation Links */}
        <nav className="nav-links">
          <Link className="nav-link" to={`/doctor/dashboard/${id}/history`}>Appointment History</Link>
          <Link className="nav-link" to="/">Schedule</Link>
          <Link className="nav-link" to="/">Earnings</Link>
        </nav>

        {/* Profile Section */}
        <div className="profile-section">
          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
