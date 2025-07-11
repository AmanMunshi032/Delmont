import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const JoinCampModal = ({ camp, user, onClose }) => {
 const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    gender: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const participantData = {
      campId: camp._id,
      campName: camp.name,
      fees: camp.fees,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      participantName: user.name,
      participantEmail: user.email,
      ...formData,
    };
   axiosSecure.post("/participants",participantData)
   .then(res =>{
    console.log(res.data)
   })

    // const res = await fetch("/api/participants", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(participantData),
    // });

  //   if (res.ok) {
  //     alert("Successfully joined the camp!");
  //     onClose(); // Close modal
  //   } else {
  //     alert("Failed to join camp.");
  //   }
   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
        <button className="absolute right-4 top-2 text-xl" onClick={onClose}>×</button>
        <h2 className="text-2xl mb-4 font-semibold">Register for {camp?.name}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input type="text" value={camp?.name} readOnly className="bg-gray-100 p-2 rounded" />
          <input type="text" value={`$${camp?.fees}`} readOnly className="bg-gray-100 p-2 rounded" />
          <input type="text" value={camp?.location} readOnly className="bg-gray-100 p-2 rounded" />
          <input type="text" value={camp?.healthcareProfessional} readOnly className="bg-gray-100 p-2 rounded" />

          <input type="text" value={user?.name} readOnly className="bg-gray-100 p-2 rounded" />
          <input type="email" value={user?.email} readOnly className="bg-gray-100 p-2 rounded" />

          <input
            name="age"
            type="number"
            required
            placeholder="Age"
            className="p-2 border rounded"
            onChange={handleChange}
          />
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="p-2 border rounded"
            onChange={handleChange}
          />
          <select
            name="gender"
            required
            className="p-2 border rounded"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="emergencyContact"
            required
            placeholder="Emergency Contact"
            className="p-2 border rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinCampModal;
