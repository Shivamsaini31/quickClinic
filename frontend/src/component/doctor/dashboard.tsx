import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCards from './SummaryCards';
import DataTable from './DataTable';

const DocDashboard: React.FC = () => {
  return (
    <div className="app1 bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="main-content1 ml-64 p-6">
        <Header />
        <SummaryCards />
        <DataTable />
      </div>
    </div>
  );
};

export default DocDashboard;
