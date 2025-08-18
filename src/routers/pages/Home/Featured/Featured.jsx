import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Calendar, MapPin, Stethoscope } from "lucide-react";
import { AuthContext } from '../../../../Context/AuthContext/AuthContext';

const featuredCamps = [
  {
    id: 1,
    title: "Free Eye Checkup Camp",
    date: "25 Aug, 2025",
    location: "Dhaka Medical College",
    image:
      "https://i.ibb.co.com/kVgXJmGs/medium-shot-woman-getting-her-eyes-checked.jpg",
    description: "Providing free eye tests, consultation, and spectacles.",
  },
  {
    id: 2,
    title: "Diabetes Awareness Camp",
    date: "30 Aug, 2025",
    location: "Chittagong General Hospital",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    description: "Free blood sugar checkups and diabetes awareness sessions.",
  },
  {
    id: 3,
    title: "Heart Health Screening",
    date: "05 Sep, 2025",
    location: "Rajshahi Health Center",
    image:
      "https://i.ibb.co.com/673c0Qvv/top-view-world-heart-day-concept-with-copy-space.jpg",
    description: "ECG, blood pressure, and free heart consultation.",
  },
];
const Featured = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
 return (
         <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold  text-gray-800">
            🌟 Featured Medical Camps
          </h2>
          <p className="text-gray-600 mt-2">
            Join our upcoming health camps and take a step towards better health.
          </p>
        </motion.div>

        {/* Camp Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white h-[300] w-[30] flex flex-col justify-between shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={camp.image}
                alt={camp.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {camp.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{camp.description}</p>

                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  {camp.date}
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  {camp.location}
                </div>
                <button   onClick={() => setIsModalOpen(true)} className="w-full flex items-center font-bold justify-center gap-2 bg-cyan-300  py-2 rounded-lg  hover:bg-cyan-500 transition">
                  <Stethoscope className="w-4 h-4" />
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
         {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4 text-center text-cyan-300">
              Register form 
            </h3>
            <form  className="space-y-3">
              <input
                type="text"
                 placeholder='Your Name'
                className="input w-full text-gray-950"
              />
              <input
                type="text"
                placeholder='Your Address'
                className="input w-full bg-gray-100"
              />
             
        

              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                className="input w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="input w-full"
              />
              <select name="gender" required className="input w-full">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                required
                className="input w-full"
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-300  rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
    );
};

export default Featured;