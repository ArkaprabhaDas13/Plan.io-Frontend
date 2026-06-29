import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoutes from './ProtectedRoutes';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';
import Loading from '../pages/Loading';

const AppRoutes = ()=>{
    return(
        <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/loading" element={<Loading/>}/>
            {/* PROTECTED ROUTES */}
            <Route path="/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
            <Route path="/projects" element={<ProtectedRoutes><Projects/></ProtectedRoutes>}/>
            <Route path="/tasks" element={<ProtectedRoutes><Tasks/></ProtectedRoutes>}/>
        </Routes>
    )
}

export default AppRoutes;