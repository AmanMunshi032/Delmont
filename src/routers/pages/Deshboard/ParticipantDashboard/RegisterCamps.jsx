// components/RegisteredCamps.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/UseAuth";
import FeedbackModal from "./FeedbackModel";
import { useNavigate } from "react-router";

const RegisteredCamps = () => {
  const [selectedCamp, setSelectedCamp] = useState(null);
  const queryClient = useQueryClient();
  const axiousSecure = UseAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: camps = [] } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(
        `/registered-camps?email=${user?.email}`
      );
      return res.data;
    },
  });
  // console.log(camps)
  const cancelMutation = useMutation({
    mutationFn: async (id) => axiousSecure.delete(`/cancel-registration/${id}`),
    onSuccess: () => {
      toast.success("Registration canceled");
      queryClient.invalidateQueries(["registeredCamps"]);
    },
  });

  const handlePayment = async (id) => {
    console.log(id);
    navigate(`/dashboard/Payment/${id}`);
   
  };

  const handleCancel = (id, paid) => {
    if (!paid) cancelMutation.mutate(id);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border text-sm">
          <thead>
            <tr>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.participantName}</td>
                <td>
                  {camp.payment_status === "paid" ? (
                    <span className=" bg-cyan-500 px-2 py-1 rounded-md text-white font-medium">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(camp._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>
                  <span
                    className={
                      camp.Confirmation === "confirmed"
                        ? "bg-green-600 font-semibold px-2 text-white py-1 rounded-md "
                        : "bg-red-600 font-semibold px-2 text-white py-1 rounded-md"
                    }
                  >
                    {camp.Confirmation}
                  </span>
                </td>
                <td className="flex flex-col gap-2">
                  <button
                    disabled={camp.payment_status === 'paid'}
                    onClick={() => handleCancel(camp._id, camp.payment_status === 'paid')}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                  {camp.payment_status === 'paid' && (
                    <button
                      onClick={() => setSelectedCamp(camp)}
                      className="btn btn-sm btn-secondary"
                    >
                      Feedback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCamp && (
        <FeedbackModal
          camp={selectedCamp}
          onClose={() => setSelectedCamp(null)}
          participantEmail={user.email}
        />
      )}
    </div>
  );
};

export default RegisteredCamps;
