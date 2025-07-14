import React, { useState } from "react";
import { Link } from "react-router";
import SocilaLoging from "../../shared/SocilaLoging/SocilaLoging";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/UseAuth";
import axios from "axios";
import UseAxious from "../../../../hooks/UseAxious";


const Rigester = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
     const [profilePic, setProfilePic] = useState('');
     const useAxious = UseAxious()
     console.log(profilePic)
  const { Creactuser,Updateprofile,setuser} = useAuth();
  const onsubmit =(data) => {
    console.log(data);
  
    Creactuser(data.email, data.password)
      .then( async(result) => {
      // update user info 
      const  updateinfo ={
        email:data.email,
        role:'user',
        created_at :new Date().toISOString()
      }

      const userRes = await useAxious.post('/users',updateinfo)
        console.log(userRes.data)
        // user profil info
         const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
   
       Updateprofile(userProfile)
    .then(()=>{
      setuser()
      console.log('profile name pic updated')
    })
    .catch((error) =>{
      console.error(error)
    })

        setuser({profilePic,...result.user})
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });

  };

     const handeluplodeImage = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);


   const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env. VITE_Uplode_key}`
       const res = await axios.post(imagUploadUrl, formData)

         setProfilePic(res.data.data.url);

    }
  return (
    <div className="hero md:min-h-screen md:mt-0 mt-10 ">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl space-y-5">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Register now!</h1>
          <form onSubmit={handleSubmit(onsubmit)} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text" name='name'
              {...register("name", { required: true })}
              className="input"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            <label className="label">Photo url</label>
            <input type="file" name='photo' 
            onChange={handeluplodeImage}
             className="input" placeholder="photo url" />
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 8,
                minLength: 6,
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500">
                Password must be 8 characters or longer
              </p>
            )}

            <button type="submit" className="btn bg-cyan-300 mt-4">
              Register
            </button>
            <SocilaLoging></SocilaLoging>
          </form>

          <p>
            Already Have an Account? please
            <Link
              className=" text-blue-500 underline ml-2 font-bold"
              to="/Login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rigester;
