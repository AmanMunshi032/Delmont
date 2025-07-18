// components/FeedbackModal.jsx

import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import UseAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const FeedbackModal = ({ camp, onClose, participantEmail }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiousSecure =UseAxiosSecure()

  const onSubmit = async (data) => {
    const DataFeedback ={
           ...data,
       campId: camp._id,
       campName:camp.campName,
      participantEmail,    
      participantName:camp.participantName,

    }
    toast.success('Feedback submitted');
    reset();
    onClose();
    axiousSecure.post('/Feedback', DataFeedback)
    .then(res=>{
   console.log(res.data)
    Swal.fire({
     title: "Good job!",
     text: " Feedback data added successfully!",
     icon: "success"
   });
    })

   
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h3 className="text-lg font-semibold mb-2">Feedback for {camp.campName}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="w-full border p-2 mb-2"
            placeholder="Your feedback"
            {...register('feedback', { required: true })}
          />
          <input
            type="number"
            min="1"
            max="5"
            className="w-full border p-2 mb-2"
            placeholder="Rating (1-5)"
            {...register('rating', { required: true })}
          />
          <div className="flex justify-between">
            <button type="submit" className="btn btn-sm btn-primary">Submit</button>
            <button onClick={onClose} type="button" className="btn btn-sm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
