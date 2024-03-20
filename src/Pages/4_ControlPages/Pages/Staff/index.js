import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Attendant from './Pages/Attendant';

function Staff(){
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/Attendant" element={<Attendant/>}/>
        </Routes>
    )
}

export default Staff;