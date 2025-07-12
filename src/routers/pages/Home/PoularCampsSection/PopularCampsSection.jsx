import {} from 'react';
import { Link } from 'react-router';
import UseAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PopularCampsSection = () => {
 
    const  axiosSecure = UseAxiosSecure()

       const {data: camps= []}=useQuery({
        querykey:['PopulerCamps'],
        queryFn : async ()=>{
          const res = await axiosSecure.get('/organizer')
          return res.data
        }
       })

        // Sort by participantCount in descending order and take top 6
        // const sorted = data
        //   .sort((a, b) => b.participantCount - a.participantCount)
        //   .slice(0, 6);

        // setCamps(sorted);
   
  
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Medical Camps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map(camp => (
            <div key={camp._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
              <img src={camp.image} alt={camp.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{camp.campName}</h3>
                <p className="text-gray-600 mb-1"><strong>Fees:</strong> ${camp.campFees}</p>
                <p className="text-gray-600 mb-1"><strong>Date & Time:</strong> {camp.dateTime}</p>
                <p className="text-gray-600 mb-1"><strong>Location:</strong> {camp.location}</p>
                <p className="text-gray-600 mb-1"><strong>Professional:</strong> {camp.doctor}</p>
                <p className="text-blue-600 font-medium mt-2">👥 Participants: {camp.participantCount}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/AvailableCamps">
            <button className="bg-cyan-300  px-6 py-2 rounded-full hover:bg-cyan-300 transition">
              See All Camps
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCampsSection;
