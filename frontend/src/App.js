import React from 'react';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/layout/header/header';
import Footer from './component/layout/footer/footer.js';
import Home from './component/home/home';
import Login from './component/login/login';
import { AuthProvider } from './component/auth/AuthContext.js';
import Doc_Dashboard from './component/doctor/dashboard.js';
import PrivateRoute from './privateroutes/privateroute.js';
import Signup from './component/signup/signup.js';
import Forgot from './component/login/forgot.js'
function App() {
   

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header  />
                    <Routes>
                        <Route path='/' element={<Home  />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/doctor/dashboard/:id' element={<PrivateRoute element={Doc_Dashboard} />} />
                        
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/forgot' element={<Forgot />} />
                    
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
