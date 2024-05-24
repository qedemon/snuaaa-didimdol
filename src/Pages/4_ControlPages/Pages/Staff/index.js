import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import AttendantCheck from './Pages/AttendantCheck';
import StatusCheck from './Pages/StatusCheck';

function Staff(){
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/Attendant" element={<AttendantCheck/>}/>
            <Route path="/StatusCheck" element={<StatusCheck/>}/>
        </Routes>
    )
}

export default Staff;