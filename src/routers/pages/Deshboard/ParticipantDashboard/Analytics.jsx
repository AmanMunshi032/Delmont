import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import useAuth from '../../../../hooks/UseAuth';
import UseAxiosSecure from '../../../../hooks/useAxiosSecure';

// const fetchRegisteredCamps = async () => {
//   const token = localStorage.getItem('token');
//   const res = await axios.get(`/api/registered-camps`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

const Analytics = () => {
    const {user}=useAuth()
    const axiousSecure = UseAxiosSecure()
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['registeredCamps',user?.email],
    queryFn: async ()=>{
     const res = await axiousSecure.get(`/registered-camps?email=${user?.email}`)
      return res.data
    }
  });

  const chartData = camps.map(camp => ({
    name: camp.campName,
    fee: parseFloat(camp.campFees),
  }));

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Camp Registration Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fee" fill="#8884d8" name="Camp Fee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
