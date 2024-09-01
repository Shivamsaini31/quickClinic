import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/header/navbar/navbar';
import Footer from './component/layout/footer/footer';
import Home from './component/home/home';
import Login from './component/login/login';
import { AuthProvider } from './component/auth/AuthContext';
import Signup from './component/signup/signup';
import Forgot from './component/login/forgot';
import PatientRoutes from './routes/pateintroutes'; // Import PatientRoutes
import DoctorRoutes from './routes/doctorroutes';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot' element={<Forgot />} />
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
