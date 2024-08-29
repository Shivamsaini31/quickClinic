
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar1">
      <div className="sidebar-item1 active">Dashboard</div>
      <div className="sidebar-item1">All Requests</div>
      <div className="sidebar-item1">Patient List</div>
      <div className="sidebar-item1">Hospital Management</div>
      <div className="sidebar-item1">Departments</div>
      <div className="sidebar-item1">Doctor Management</div>
      <div className="sidebar-item1">Invoice Management</div> 
      <div className="sidebar-item1">User Management</div>
      <div className="sidebar-item1">Settings</div>
      <div className="sidebar-item1">Logout</div>
    </div>
  );
}

export default Sidebar;
