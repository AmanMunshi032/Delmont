import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const fetchCamp = async (campId) => {
  const { data } = await axios.get(`/http://localhost:5000/organizerlode/${campId}`);
  return data;
};

const updateCamp = async ({ campId, updatedData }) => {
  const { data } = await axios.put(`/http://localhost:5000/organizerlode/${campId}`, updatedData);
  return data;
};

const Update= () => {

  const { campId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  // Get camp data for prefilling the form
  const { data: campData, isLoading } = useQuery({
    queryKey: ['camp', campId],
    queryFn: () => fetchCamp(campId),
    onSuccess: (data) => reset(data)
  });

  // Mutation for updating the camp
  const { mutate, isPending } = useMutation({
    mutationFn: ({ campId, updatedData }) => updateCamp({ campId, updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries(['camp']);
      alert("Camp updated successfully");
      navigate("/dashboard/manage-camps");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      alert("Failed to update camp.");
    }
  });

  const onSubmit = (formData) => {
    mutate({ campId, updatedData: formData });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Update Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("campName")} className="input w-full" placeholder="Camp Name" />
        <input {...register("image")} className="input w-full" placeholder="Image URL" />
        <input {...register("campFees")} type="number" className="input w-full" placeholder="Camp Fees" />
        <input {...register("dateTime")} type="datetime-local" className="input w-full" />
        <input {...register("location")} className="input w-full" placeholder="Location" />
        <input {...register("healthcareProfessional")} className="input w-full" placeholder="Healthcare Professional" />
        <textarea {...register("description")} className="textarea w-full" placeholder="Description" />
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Updating..." : "Update Camp"}
        </button>
      </form>
    </div>
  );
};

export default Update;
