import React from 'react'
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const ProtectedRoutes = ({children}) => {

    const isAuthenticated = true;

    if(!isAuthenticated)
    {
        return <Navigate to="/login"/>
    }

    return children;
}

export default ProtectedRoutes;