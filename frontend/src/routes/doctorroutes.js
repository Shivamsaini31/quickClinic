// src/routes/DoctorRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocDashboard from '../component/doctor/dashboard';
import DoctorHeader from '../component/doctor/header/header'; 
import Appointment from '../component/doctor/appointments/appointments';
import LeavePage from '../component/doctor/leave/leave';
import Schedule from '../component/doctor/update/schedule';
import EarningsPage from '../component/doctor/earnings/earnings';
import DoctorUpdatePage from '../component/doctor/update/update';
import SchedulePage from '../component/doctor/schedule/schedule';
// Create DoctorHeader if it doesn't exist

const DoctorRoutes = () => (
  <>
    <DoctorHeader /> {/* Display DoctorHeader for all doctor routes */}
    <Routes>
      <Route path='/dashboard/:id' element={<DocDashboard />} />
      <Route path='/dashboard/:id/appointments' element={<Appointment/>}/>
      <Route path='/dashboard/:id/leave' element={<LeavePage/>}/>
      <Route path='/:id/update_schedule' element={<Schedule/>}/>
      <Route path='/dashboard/:id/earnings' element={<EarningsPage/>} />
      <Route path='/:id/update_doctor' element={<DoctorUpdatePage/>}/>
<Route path='dashboard/:id/schedule' element={<SchedulePage/>}/>
      {/* Add additional routes here as needed */}
    </Routes>
  </>
);

export default DoctorRoutes;