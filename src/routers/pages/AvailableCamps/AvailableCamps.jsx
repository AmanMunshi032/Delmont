import React from 'react';
import UseAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const AvailableCamps = () => {
  const axiosSecure = UseAxiosSecure()
    const {data: camps= []}=useQuery({
        querykey:['PopulerCamps'],
        queryFn : async ()=>{
          const res = await axiosSecure.get('/Alldata')
          return res.data
        }
       })
    return (
       <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Available Medical Camps</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="border rounded-2xl shadow-md p-5 flex flex-col justify-between"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">{camp.campName}</h3>
              <p className="text-sm text-gray-600 mb-1">📍 {camp.location}</p>
              <p className="text-sm text-gray-600 mb-1">🧑‍⚕️ {camp.doctor}</p>
              <p className="text-sm text-gray-600 mb-1">📅 {camp.dateTime}</p>
              <p className="text-sm text-gray-600 mb-1">💸 Fees: ${camp.campFees}</p>
              <p className="text-sm text-gray-600 mb-2">👥 Participants: {camp.participantCount}</p>
              <p className="text-sm text-gray-700 line-clamp-2 mb-4">{camp.description}</p>
            </div>
            <Link
              to={`/CampDetails/${camp._id}`}
              className=" text-center bg-cyan-300 hover:bg-cyan-300  font-semibold py-2 px-4 rounded-xl "
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
};

export default AvailableCamps;