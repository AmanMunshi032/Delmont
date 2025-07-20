import React from 'react';
import useAuth from '../hooks/UseAuth';
import UseUserRole from '../hooks/UseUserRole';
import { Navigate } from 'react-router';

const Adminroute = ({children}) => {
    const {user, Loding}=useAuth()
    const {role,roleLoding}=UseUserRole()
       if (Loding ||roleLoding ) {
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user || role !== "admin"){
        return  <Navigate to='/Forbidden'></Navigate>
    }
    return children
     
};

export default Adminroute;