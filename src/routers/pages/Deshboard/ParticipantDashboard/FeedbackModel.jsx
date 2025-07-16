// components/FeedbackModal.jsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';


const FeedbackModal = ({ camp, onClose, participantEmail }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await axios.post('/api/feedback', {
      ...data,
      campId: camp._id,
      participantEmail,
    });
    toast.success('Feedback submitted');
    reset();
    onClose();
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
