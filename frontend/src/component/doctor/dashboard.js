import React from 'react';
import { useParams } from 'react-router-dom';

const Doc_Dashboard = () => {
  const { id } = useParams();
  
  // Use the id as needed
  console.log("Doctor ID in dashboard:", id);

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      {/* Render dashboard content here */}
    </div>
  );
};

export default Doc_Dashboard;
