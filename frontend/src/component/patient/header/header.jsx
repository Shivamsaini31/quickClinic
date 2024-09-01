import React from "react";
import "./header.css"; // Import your custom CSS for additional styles
import { useNavigate, Link } from "react-router-dom";

const PatientHeader = () => {
  const data=localStorage.getItem('authState');
  const fetchdata=JSON.parse(data);
  
  const id = fetchdata.user._id; // Correctly using useParams to get the id
  const navigate = useNavigate();

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
          />
          <span className="profile-name">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
