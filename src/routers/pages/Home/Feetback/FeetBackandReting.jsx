import React from 'react';
// import useAuth from '../../../../hooks/UseAuth';
import UseAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';

const FeetBackandReting = () => {
    // const {user}=useAuth()
    const axiousSecure =UseAxiosSecure()
    const { data: feedbacks=[]}=useQuery({
        queryKey:["Feetback"],
        queryFn: async()=>{
            const  res = await axiousSecure.get(`/Feedback`)
            return res.data
        }
    })
    return (
        <div className="p-6  shadow-md rounded-2xl mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Your Feedback & Ratings</h2>
     <div className=''>
       <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.map(fb => (
          <div key={fb._id} className="border p-4 rounded-xl  ">
            <h3 className="font-semibold">{fb.campName}</h3>
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < fb.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
              <span className="ml-2 text-sm ">({fb.rating} stars)</span>
            </div>
            <p className=" italic">{fb.feedback}</p>
    <p className="text-xs  mt-1"> Name:{fb.
participantName}</p>
    <p className="text-xs  mt-1"> Email:{fb.
participantEmail}</p>
          </div>
        ))}
      </div>
     </div>
    </div>
    );
};

export default FeetBackandReting;