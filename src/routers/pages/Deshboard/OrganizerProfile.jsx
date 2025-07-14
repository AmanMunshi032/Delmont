import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";


const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  console.log(organizer)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = UseAxiosSecure()
  // Fetch organizer profile
  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const res = await axiosSecure.get("/organizerlode", {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        });
        setOrganizer(res.data);
        reset(res.data);
      } catch (error) {
        console.log(error)
        toast.error("Failed to load profile");
      }
    };

    fetchOrganizer();
  }, [reset]);

  // Handle update submission
  const onSubmit = async (data) => {
    try {
      const res = await axios.put("/api/organizer/profile", data, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      setOrganizer(res.data);
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
        console.log(error)
      toast.error("Update failed");
    }
  };

  if (!organizer) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Organizer Profile</h2>

      {!editMode ? (
        <div className="space-y-4">
          <img
            src={organizer.ProfilImg}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto"
          />
          <p><strong>Name:</strong> {organizer.Name}</p>
          <p><strong>Email:</strong> {organizer.created_by}</p>
          <p><strong>Contact:</strong> {organizer.Contact}</p>
          <div className="text-center mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              className="w-full border px-3 py-2 rounded"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          <div>
            <label className="block font-medium">Image URL</label>
            <input
              className="w-full border px-3 py-2 rounded"
              {...register("image", { required: true })}
            />
            {errors.image && <p className="text-red-500">Image URL is required</p>}
          </div>

          <div>
            <label className="block font-medium">Contact</label>
            <input
              className="w-full border px-3 py-2 rounded"
              {...register("contact", { required: true })}
            />
            {errors.contact && <p className="text-red-500">Contact is required</p>}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                reset(organizer);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrganizerProfile;
