import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';

function Staff(){
    return (
        <Routes>
            <Route path="/" exact element={<Home/>} />
        </Routes>
    )
}

export default Staff;