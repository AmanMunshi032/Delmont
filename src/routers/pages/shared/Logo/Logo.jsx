import React from 'react';
import { FaHeartbeat } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa";
const Logo = () => {
    return (
        <div className='flex items-cente text-centerr md:text-3xl space-x-1 text-xl'>
         <FaBriefcaseMedical className='text-cyan-400' />
          <h1 className='font-bold  mb-2 '>HealthFirst Camp</h1> 
       
         
        </div>
    );
};

export default Logo;