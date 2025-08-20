
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/UseAuth";
import FeedbackModal from "./FeedbackModel";
import { useNavigate } from "react-router";

const RegisteredCamps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const queryClient = useQueryClient();
  const axiousSecure = UseAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: camps = [] } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/registered-camps?email=${user?.email}`);
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => axiousSecure.delete(`/cancel-registration/${id}`),
    onSuccess: () => {
      toast.success("Registration canceled");
      queryClient.invalidateQueries(["registeredCamps"]);
    },
  });

  const handlePayment = (id) => {
    navigate(`/dashboard/Payment/${id}`);
  };

  const handleCancel = (id, paid) => {
    if (!paid) cancelMutation.mutate(id);
  };

  const filteredCamps = useMemo(() => {
    let result = [...camps];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (camp) =>
          camp.campName.toLowerCase().includes(term) ||
          camp.participantName.toLowerCase().includes(term) ||
          camp.campFees.toLowerCase().includes(term)
      );
    }
    return result;
  }, [camps, searchTerm]);

  const paginatedCamps = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredCamps.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredCamps, currentPage]);

  const totalPages = Math.ceil(filteredCamps.length / rowsPerPage);

  return (
    <div className="p-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Registered Camps</h2>
      <input
        type="text"
        placeholder="Search by Campname, CampFee, participantName..."
        className="input  text-black input-bordered w-full md:w-2/3 mb-6"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to page 1 on search
        }}
      />
      <div className="overflow-x-auto">
        <table className="table w-full border text-sm">
          <thead>
            <tr className="dark:text-white">
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.campName}</td>
                <td>৳{camp.campFees}</td>
                <td>{camp.participantName}</td>
                <td>
                  {camp.payment_status === "paid" ? (
                    <span className="bg-cyan-500 px-2 py-1 rounded-md text-white font-medium">
                      Paid
                    </span>
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
                    className={`font-semibold px-2 py-1 rounded-md text-white ${
                      camp.Confirmation === "confirmed"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {camp.Confirmation}
                  </span>
                </td>
                <td className="flex flex-col gap-2">
                  <button
                    disabled={camp.payment_status === "paid"}
                    onClick={() =>
                      handleCancel(camp._id, camp.payment_status === "paid")
                    }
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                  {camp.payment_status === "paid" && (
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

        {/* Pagination Footer */}
        {filteredCamps.length > rowsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1 ? "bg-cyan-300 " : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
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
