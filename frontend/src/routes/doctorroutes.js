// src/routes/DoctorRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocDashboard from '../component/doctor/dashboard';

import DoctorHeader from '../component/doctor/header/header'; 
// Create DoctorHeader if it doesn't exist

const DoctorRoutes = () => (
  <>
    <DoctorHeader /> {/* Display DoctorHeader for all doctor routes */}
    <Routes>
      <Route path='/dashboard/:id' element={<DocDashboard />} />
      {/* Add additional routes here as needed */}
    </Routes>
  </>
);

export default DoctorRoutes;