import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"; // custom auth hook
import Swal from "sweetalert2";
import useAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const CampDetails = () => {
  const { campId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const { data: camp, isLoading } = useQuery({
    queryKey: ["campDetails", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (participantData) => {
      const res = await axiosSecure.post(
        `/participants`,
        participantData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["campDetails", campId]);
      Swal.fire("Success", "You have joined the camp!", "success");
      setIsModalOpen(false);
    },
    onError: () => {
      Swal.fire("Error", "Could not register. Please try again.", "error");
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const participantData = {
      campId: camp._id,
      payment_status: 'unpaid',
      Confirmation: 'pending',
      campName: camp.campName,
      campFees: camp.campFees,
      location: camp.location,
      healthcareProfessional: camp.doctor,
      participantName: user.displayName,
      participantEmail: user.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergencyContact.value,
     

    };
    mutation.mutate(participantData);
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-11 ">
      <img
        src={camp?.image}
        alt={camp?.campName}
        className="rounded-xl object-cover mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{camp?.campName}</h2>
      <p className="  mb-1">
        <strong>Fees:</strong> ${camp.campFees}
      </p>
      <p className=" bg-amber-200 mb-1">
        <strong>Date & Time:</strong> {camp.dateTime}
      </p>
      <p className=" mb-1">
        <strong>Location:</strong> {camp.location}
      </p>
      <p className=" mb-1">
        <strong>Healthcare Professional:</strong> {camp.doctor}
      </p>
      <p className=" mb-1">
        <strong>Participants:</strong> {camp.participantCount}
      </p>
      <p className=" mb-4">
        <strong>Description:</strong> {camp.description}
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-cyan-300  font-bold px-6 py-2 rounded-xl hover:bg-cyan-700 transition"
      >
        Join Camp
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4 text-center text-cyan-300">
              Register for {camp.campName}
            </h3>
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                type="text"
                value={camp.campName}
                readOnly
                className="input w-full bg-gray-100"
              />
              <input
                type="text"
                value={`$${camp.campFees}`}
                readOnly
                className="input w-full bg-gray-100"
              />
              <input
                type="text"
                value={camp.location}
                readOnly
                className="input w-full bg-gray-100"
              />
              <input
                type="text"
                value={camp.doctor}
                readOnly
                className="input w-full bg-gray-100"
              />
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input w-full bg-gray-100"
              />
              <input
                type="email"
                value={user?.email}
                readOnly
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
    </div>
  );
};

export default CampDetails;
