import React from 'react';
import useAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRouter = ({children}) => {
    const {user, loading}=useAuth()
    const location = useLocation()
    
    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }
        if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/Login"></Navigate>
    }

    return children
};

export default PrivetRouter;