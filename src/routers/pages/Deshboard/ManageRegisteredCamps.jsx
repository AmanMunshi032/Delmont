
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {  } from 'react';
import Swal from 'sweetalert2';

const fetchRegistrations = async () => {
  const { data } = await axios.get('/api/registrations');
  return data;
};

 const ManageRegisteredCamps = () => {
  const queryClient = useQueryClient();
  const { data: registrations = [], isLoading } = useQuery(['registrations'], fetchRegistrations);

  const updateConfirmation = useMutation(
    (id) => axios.patch(`/api/registrations/confirm/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['registrations']);
      },
    }
  );

  const cancelRegistration = useMutation(
    (id) => axios.delete(`/api/registrations/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['registrations']);
      },
    }
  );

  const handleConfirm = (id) => {
    updateConfirmation.mutate(id);
  };

  const handleCancel = (id, isPaid, isConfirmed) => {
    if (isPaid && isConfirmed) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This registration will be canceled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelRegistration.mutate(id);
      }
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Registered Camps</h2>
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
          {registrations.map((reg) => (
            <tr key={reg._id} className="border-t">
              <td className="py-2 px-4">{reg.campName}</td>
              <td className="py-2 px-4">৳{reg.campFees}</td>
              <td className="py-2 px-4">{reg.participantName}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    reg.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {reg.paymentStatus}
                </span>
              </td>
              <td className="py-2 px-4">
                {reg.confirmationStatus === 'Confirmed' ? (
                  <span className="px-2 py-1 rounded bg-green-600 text-white text-sm">
                    Confirmed
                  </span>
                ) : (
                  <button
                    onClick={() => handleConfirm(reg._id)}
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
                      reg.paymentStatus === 'Paid',
                      reg.confirmationStatus === 'Confirmed'
                    )
                  }
                  disabled={reg.paymentStatus === 'Paid' && reg.confirmationStatus === 'Confirmed'}
                  className={`px-3 py-1 rounded text-white ${
                    reg.paymentStatus === 'Paid' && reg.confirmationStatus === 'Confirmed'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRegisteredCamps;
