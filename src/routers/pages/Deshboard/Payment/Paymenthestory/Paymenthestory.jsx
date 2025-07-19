import React, { useState, useMemo } from 'react';
import useAuth from '../../../../../hooks/UseAuth';
import UseAxious from '../../../../../hooks/UseAxious';
import { useQuery } from '@tanstack/react-query';

const formatDate = (iso) => new Date(iso).toLocaleString();

const Paymenthestory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user } = useAuth();
  const axiosSecure = UseAxious();

  const { isPending, data: Payments = [] } = useQuery({
    queryKey: ['paymenthestory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  const filteredCamps = useMemo(() => {
    let result = [...Payments];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((camp) =>
        camp.amount.toLowerCase().includes(term)
      );
    }
    return result;
  }, [Payments, searchTerm]);

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);

  const currentPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCamps.slice(start, start + itemsPerPage);
  }, [currentPage, filteredCamps]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isPending) return '.....Loading';

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by Amount..."
        className="input input-bordered w-full md:w-1/3 mb-6"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page on new search
        }}
      />

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Transaction</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((p, index) => (
                <tr key={p.transactionId}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="truncate" title={p.parcelId}>
                    {p.ParticipantId}...
                  </td>
                  <td>৳ {p.amount}</td>
                  <td className="font-mono text-sm" title={p.transactionId}>
                    {p.transactionId}...
                  </td>
                  <td>{formatDate(p.paid_at_string)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${currentPage === num + 1 ? 'btn-active bg-cyan-300' : ''}`}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paymenthestory;
