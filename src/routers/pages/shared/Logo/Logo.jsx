import React from 'react';
import { FaHeartbeat } from "react-icons/fa";
const Logo = () => {
    return (
        <div className='flex items-center md:text-3xl space-x-1 text-xl'>
          <h1 className='font-bold  mb-2'>Delm</h1> 
          <FaHeartbeat className='text-cyan-200'/>
          <h1 className='font-bold mb-2'>nt</h1>
        </div>
    );
};

export default Logo;