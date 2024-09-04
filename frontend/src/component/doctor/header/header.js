// src/component/doctor/header/DoctorHeader.jsx
import React from 'react';
import './header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link} from 'react-router-dom';
const DoctorHeader = () => {
  const data=localStorage.getItem('authState');
  const fetchdata=JSON.parse(data);
  
  const id = fetchdata.user._id;
  console.log("id",id);
  return (
    <header className="doctor-navbar">
      <div className="container">
        {/* Logo Section */}
        <a className="navbar-brand" href={`/doctor/dashbaord/${id}`}>Doctor Dashboard</a>
        
        {/* Navigation Links */}
        <nav className="nav-links">
          <Link className="nav-link" to={`/doctor/dashboard/${id}/appointments`}>Appointment History</Link>
          <Link className="nav-link" to={`/doctor/dashboard/${id}/schedule`}>Schedule</Link>
          <Link className="nav-link" to="/">Earnings</Link>
          <Link className="nav-link" to={`/doctor/dashboard/${id}/leave`}>Leave</Link>
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
