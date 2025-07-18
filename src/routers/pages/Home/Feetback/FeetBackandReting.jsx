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
        <div className="p-6 bg-white shadow-md rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Feedback & Ratings</h2>
      <ul className="space-y-4">
        {feedbacks.map(fb => (
          <li key={fb._id} className="border p-4 rounded-xl">
            <h3 className="font-semibold">{fb.campName}</h3>
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < fb.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({fb.rating} stars)</span>
            </div>
            <p className="text-gray-700 italic">{fb.feedback}</p>
    <p className="text-xs text-gray-400 mt-1"> Name:{fb.
participantName}</p>
    <p className="text-xs text-gray-400 mt-1"> Email:{fb.
participantEmail}</p>
          </li>
        ))}
      </ul>
    </div>
    );
};

export default FeetBackandReting;