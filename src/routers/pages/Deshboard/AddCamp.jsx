import React from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/UseAuth';

const AddCamp = () => {
 const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const axiosSecure = UseAxiosSecure()
  const {user}=useAuth()
  console.log(user)
  const onSubmit = (data) => {
       console.log(data)
       const AddData ={
         ...data,
          Name:user.displayName,
         ProfilImg:user.photoURL,
          created_by: user.email,
          participantCount : 0,
       }
    
       
       
   axiosSecure.post('/organizer',AddData)
       .then((res)=>{
        console.log(res.data)
        Swal.fire({
  title: "Good job!",
  text: " Medical camp added successfully!",
  icon: "success"
});
        
  })
}
      
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300">Add A New Medical Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input {...register("campName", { required: true })} placeholder="Camp Name" className="input w-full" />
        {errors.campName && <p className="text-red-500 text-sm">Camp Name is required</p>}

        <input {...register("image", { required: true })} placeholder="Image URL" className="input w-full" />
        {errors.image && <p className="text-red-500 text-sm">Image is required</p>}

        <input {...register("campFees", { required: true })} type="number" placeholder="Camp Fees" className="input w-full" />
        {errors.campFees && <p className="text-red-500 text-sm">Fees are required</p>}

        <input {...register("dateTime", { required: true })} type="datetime-local" className="input w-full" />
        {errors.dateTime && <p className="text-red-500 text-sm">Date & Time required</p>}

        <input {...register("location", { required: true })} placeholder="Location" className="input w-full" />
        {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
        <input {...register("Contact", { required: true })} placeholder="Contact" className="input w-full" />
        {errors.Contact && <p className="text-red-500 text-sm">Contact is required</p>}

        <input {...register("doctor", { required: true })} placeholder="Healthcare Professional" className="input w-full" />
        {errors.doctor && <p className="text-red-500 text-sm">Healthcare professional required</p>}

        <textarea {...register("description", { required: true })} placeholder="Description" rows={4} className="input w-full" />
        {errors.description && <p className="text-red-500 text-sm">Description required</p>}

        <button type="submit" className="w-full bg-cyan-300 p-3 rounded-xl hover:bg-cyan-700 transition">
          Submit
        </button>
      </form>
    </div>
    );
};

export default AddCamp;