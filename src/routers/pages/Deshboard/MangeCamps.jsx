import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import useAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MangeCamps = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: camps = [], refetch } = useQuery({
    queryKey: ["manage-Camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/organizerlode?email=${user?.email}`);
      return res.data;
    },
  });

  const handleUpdate = (id) => {
    navigate(`/dashboard/Update/${id}`);
  };

  const handleDelete = async (id) => {
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
        axiosSecure.delete(`/organizerlode/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Camp has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete camp", "error");
      }
    }
  };

  // Filtered and paginated data
  const filteredCamps = useMemo(() => {
    let result = [...camps];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (camp) =>
          camp.campName.toLowerCase().includes(term) ||
          camp.location.toLowerCase().includes(term) ||
          camp.doctor.toLowerCase().includes(term)
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Camps</h2>

      <input
        type="text"
        placeholder="Search by Camp Name, Location, Doctor..."
        className="input input-bordered w-full md:w-1/3 mb-6"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset page on search
        }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">Camp Name</th>
              <th className="px-4 py-2 text-left">Date & Time</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Healthcare Professional</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp) => (
              <tr key={camp._id} className="border-t">
                <td className="px-4 py-2">{camp.campName}</td>
                <td className="px-4 py-2">{camp.dateTime}</td>
                <td className="px-4 py-2">{camp.location}</td>
                <td className="px-4 py-2">{camp.doctor}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(camp._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 mb-3 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredCamps.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No camps found.
                </td>
              </tr>
            )}
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
                  currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangeCamps;
