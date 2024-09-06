import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../component/home/home';
import Login from '../component/users/login/login';
import Signup from '../component/users/signup/signup';
import Forgot from '../component/users/login/forgot';
import UpdateUserInfo from '../component/users/update/update';
const UserRoutes = () => (
    
       
      <Routes>
           <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/:id/update' element={<UpdateUserInfo/>}/>
     
      </Routes>
    
  );
  
  export default UserRoutes;
  