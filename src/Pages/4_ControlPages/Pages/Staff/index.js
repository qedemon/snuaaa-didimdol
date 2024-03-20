import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Admin from './Pages/Admin';

function Staff(){
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/Admin" element={<Admin/>}/>
        </Routes>
    )
}

export default Staff;