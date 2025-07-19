import { useParams, } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateCamp = () => {
  const { campId } = useParams();
  console.log(campId)
  // const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure()
  const queryClient = useQueryClient();

  const { data:camp, isLoading } = useQuery({
    queryKey: ['camp', campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    }
  });

  const { register, handleSubmit, } = useForm();

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      await axiosSecure.put(`camps/${campId}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer-camps']);
      toast.success('Camp updated successfully');
      // navigate('/dashboard/manage-camps');
    }
  });

  const onSubmit = (data) => {
      Swal.fire({
      title: "Good job!",
      text: " Medical camp Update successfully!",
      icon: "success"
    });
    updateMutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300">Update Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input  defaultValue={camp.campName} {...register("campName", { required: true })} placeholder="Camp Name" className="input w-full" />
      

        <input  defaultValue={camp.image} {...register("image", { required: true })} placeholder="Image URL" className="input w-full" />
       

        <input defaultValue={camp.campFees} {...register("campFees", { required: true })} type="number" placeholder="Camp Fees" className="input w-full" />
       

        <input  defaultValue={camp.dateTime}{...register("dateTime", { required: true })} type="datetime-local" className="input w-full" />
       

        <input  defaultValue={camp.location}{...register("location", { required: true })} placeholder="Location" className="input w-full" />
       

        <input  defaultValue={camp.doctor}{...register("doctor", { required: true })} placeholder="Healthcare Professional" className="input w-full" />
        

        <textarea  defaultValue={camp.description}{...register("description", { required: true })} placeholder="Description" rows={4} className="input w-full" />
        

        <button type="submit" className="w-full bg-cyan-300 p-3 rounded-xl hover:bg-cyan-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateCamp;
