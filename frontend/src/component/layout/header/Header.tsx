import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import GuestHeader from './GuestHeader';
import PatientHeader from '../../patient/header/header';
import DoctorHeader from '../../doctor/header/header';

const Header: React.FC = () => {
  const { authState } = useAuth();

  // If user is not logged in, show guest header
  if (!authState.success || !authState.user) {
    return <GuestHeader />;
  }

  // If user is logged in, show role-specific header
  if (authState.user.role === 'patient') {
    return <PatientHeader />;
  } else if (authState.user.role === 'doctor') {
    return <DoctorHeader />;
  }

  // Fallback to guest header
  return <GuestHeader />;
};

export default Header;
