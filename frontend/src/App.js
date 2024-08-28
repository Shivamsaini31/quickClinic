import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/layout/header/header';
import Footer from './component/layout/footer/footer';
import Home from './component/home/home';
import Login from './component/login/login';
import { AuthProvider } from './component/auth/AuthContext.js';
import Doc_Dashboard from './component/doctor/dashboard.js';
import PrivateRoute from './privateroutes/privateroute.js';
import Signup from './component/signup/signup.js';
import Forgot from './component/login/forgot.js'
function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header onSearch={handleSearch} />
                    <Routes>
                        <Route path='/' element={<Home searchQuery={searchQuery} />} />
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
