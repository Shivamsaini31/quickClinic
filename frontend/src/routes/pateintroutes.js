// src/routes/PatientRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PatientDashboard from '../component/patient/dashboard/Patient_Dashboard';
import Appointment from '../component/patient/bookappointment/bookingpage/appointment';
import PatientHeader from '../component/patient/header/header';
import AppointmentHistory from '../component/patient/appointmenthistory/appointmenthistory';
import AppointmentActions from '../component/patient/cancel_and_postpond/cancel_postpond';
import Updatepatient from '../component/patient/updatepatient/updatepatient'
import Createpatient from '../component/patient/createpatient/createpatient'

const PatientRoutes = () => (
  <>
    <PatientHeader /> {/* Display PatientHeader for all patient routes */}
    <Routes>
      <Route path='/dashboard/:id' element={<PatientDashboard />} />
      <Route path='/dashboard/:id/appointment' element={<Appointment />} />
      <Route path='/dashboard/:id/history' element={<AppointmentHistory />} />
      <Route path='/dashboard/:id/cancel/postpond' element={<AppointmentActions />} />
      <Route path='/:id/update_patient' element={<Updatepatient/>}/>
      <Route path='/:id/create_patient' element={<Createpatient/>}/>
   
   
    </Routes>
  </>
);

export default PatientRoutes;
