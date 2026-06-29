import React from 'react'
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import type { ReactNode } from 'react';
import Loading from '../pages/Loading';


interface ProtectedRoutesProps{
    children: ReactNode
}

const ProtectedRoutes = ({children}: ProtectedRoutesProps) => {

    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const loading = useSelector((state: RootState) => state.auth.loading);

    // const isAuthenticated = true;

    if(loading)
    {
        return <Loading/>
    }

    if(!isAuthenticated)
    {
        return <Navigate to="/login"/>
    }

    return children;
}

export default ProtectedRoutes;