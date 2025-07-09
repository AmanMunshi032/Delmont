import React from 'react';
import Logo from '../../routers/pages/shared/Logo/Logo';
import { Outlet } from 'react-router';
import  AuthIMg from '../../assets/Auth.jpg'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto '>
        <div className='Absolute  '>
             <Logo></Logo>
        </div>
        <div className='Relative'>
            <Outlet></Outlet>
         </div>
        </div>
         
    );
};

export default AuthLayout;