import React from 'react';
import { Outlet } from 'react-router';
import Navevber from '../routers/pages/shared/Navber/Navevber';
import Footer from '../routers/pages/shared/Footer/Footer';


const Root = () => {
    return (
        <div>
        <Navevber></Navevber>
        <div className='max-w-7xl mx-auto md:mt-4 mt-0'>
            <Outlet></Outlet>  
        </div>
          <Footer></Footer>
        </div>
    );
};

export default Root;