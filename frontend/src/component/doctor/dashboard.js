import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCards from './SummaryCards';
import DataTable from './DataTable';
import './Dashboard.css';

const Doc_Dashboard = () => { 

  return (
    <div className="app1">
    <Sidebar />
    <div className="main-content1">
      <Header />
      <SummaryCards />   
      <DataTable /> 
    </div>
  </div>
  );
};

export default Doc_Dashboard;
