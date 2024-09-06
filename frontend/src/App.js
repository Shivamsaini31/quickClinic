import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/header/navbar/navbar';
import Footer from './component/layout/footer/footer';
import { AuthProvider } from './component/auth/AuthContext';
import PatientRoutes from './routes/pateintroutes'; // Import PatientRoutes
import DoctorRoutes from './routes/doctorroutes';
import UserRoutes from './routes/userroute';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/user/*' element={<UserRoutes/>}/>
            <Route path='/patient/*' element={<PatientRoutes />} />
            <Route path='/doctor/*' element={<DoctorRoutes/>}/>
             {/* Use PatientRoutes here */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
