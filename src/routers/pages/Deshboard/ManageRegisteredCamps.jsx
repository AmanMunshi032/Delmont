// 



import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRegisteredCamps = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: registrations = [], isLoading, refetch } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registrations");
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/registrations/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Registration has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete registration", "error");
      }
    }
  };

  // Filtered data by search
  const filteredCamps = useMemo(() => {
    let result = [...registrations];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (camp) =>
          camp.campName.toLowerCase().includes(term) ||
          camp.campFees.toLowerCase().includes(term) ||
          camp.participantName.toLowerCase().includes(term)
      );
    }
    return result;
  }, [registrations, searchTerm]);

  // Paginate filtered data
  const paginatedCamps = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredCamps.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredCamps, currentPage]);

  const totalPages = Math.ceil(filteredCamps.length / rowsPerPage);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Registered Camps</h2>

      <input
        type="text"
        placeholder="Search by campName, campFees, participantName..."
        className="input input-bordered w-full md:w-1/3 mb-6"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Camp Name</th>
              <th className="py-2 px-4 text-left">Fees</th>
              <th className="py-2 px-4 text-left">Participant Name</th>
              <th className="py-2 px-4 text-left">Payment Status</th>
              <th className="py-2 px-4 text-left">Confirmation</th>
              <th className="py-2 px-4 text-left">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((reg) => (
              <tr key={reg._id} className="border-t">
                <td className="py-2 px-4">{reg.campName}</td>
                <td className="py-2 px-4">৳{reg.campFees}</td>
                <td className="py-2 px-4">{reg.participantName}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      reg.payment_status === "paid" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {reg.payment_status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {reg.Confirmation === "confirmed" ? (
                    <span className="px-2 py-1 rounded bg-green-600 text-white text-sm">
                      Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => reg._id}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Pending
                    </button>
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() =>
                      handleCancel(
                        reg._id,
                        reg.payment_status === "paid",
                        reg.Confirmation === "confirmed"
                      )
                    }
                    disabled={
                      reg.payment_status === "paid" && reg.Confirmation === "confirmed"
                    }
                    className={`px-3 py-1 rounded text-white ${
                      reg.payment_status === "paid" && reg.Confirmation === "confirmed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
