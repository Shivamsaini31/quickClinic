import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import NotificationsDropdown from "../../notifications/notifications";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import PatientSidebar from "../sidebar/PatientSidebar";

import HistoryIcon from '@mui/icons-material/History';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';

const PatientHeader = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const data = localStorage.getItem('authState');
  const fetchdata = data ? JSON.parse(data) : null;
  const id = fetchdata?.user?._id;
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    setShowProfileCard((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authState');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <PatientSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl">
        <div className="container mx-auto p-4 flex items-center justify-between">
          {/* Sidebar Toggle Button - Visible on all screen sizes */}
          <button
            onClick={toggleSidebar}
            className="p-3 rounded-lg hover:bg-white/20 transition duration-300 flex items-center gap-2 bg-white/10 border border-white/20"
            title={isSidebarOpen ? "Close Menu" : "Open Menu"}
          >
            {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            <span className="hidden sm:inline text-sm font-medium">Menu</span>
          </button>

          {/* Logo Section */}
          <Link className="text-3xl font-bold tracking-wider hover:text-yellow-300 transition duration-300" to="/user/home">
            <span className="mr-2">🏥</span>
            QuickClinic
          </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex space-x-6">
          <Tooltip title="Book Appointment">
            <IconButton
              className="text-white hover:text-yellow-300 transition duration-300"
              onClick={() => navigate(`/patient/dashboard/${id}/appointment`)}
            >
              <CalendarTodayIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Appointment History">
            <Link className="text-white hover:text-yellow-300" to={`/patient/dashboard/${id}/history`}>
              <IconButton>
                <HistoryIcon fontSize="large" />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Cancel/Postpone">
            <Link className="text-white hover:text-yellow-300" to={`/patient/dashboard/${id}/cancel/postpond`}>
              <IconButton>
                <EventBusyIcon fontSize="large" />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              className="text-white hover:text-red-300 transition duration-300"
              onClick={handleLogout}
            >
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </nav>

        {/* User Profile Section */}
        <div className="relative">
          <IconButton onClick={handleProfileIconClick}>
            <Avatar
              className="hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-110"
            />
          </IconButton>
          <span className="ml-2 text-lg font-semibold">{fetchdata?.user?.name}</span>

          {/* Profile Card */}
          {showProfileCard && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 shadow-xl rounded-lg p-4">
                <h6 className="font-bold">Name: {fetchdata?.user?.name}</h6>
                <h6>Email: {fetchdata?.user?.email}</h6>
                <h6>Phone: {fetchdata?.user?.phoneNumber}</h6>
                <div className="mt-3 space-y-2">
                  <Link
                    className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg shadow-md transition duration-300"
                    to={`/user/${id}/update`}
                  >
                    Update Info
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                  >
                    <LogoutIcon fontSize="small" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

        {/* Notifications Section */}
        <div className="bg-gray-800 p-2">
          <NotificationsDropdown />
        </div>
      </header>
    </>
  );
};

export default PatientHeader;
