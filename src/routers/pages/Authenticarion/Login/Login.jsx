import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocilaLoging from "../../shared/SocilaLoging/SocilaLoging";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/UseAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const{Sigin}=useAuth()
  const location = useLocation()
  const navegate = useNavigate()
  const from = location.state?.from ||'/'
  const onSubmit = (data) => {
    console.log(data);
    
Sigin(data.email,data.password)
.then(result =>{
 console.log(result.user)
 navegate(from)
})
.catch(error=>{
  console.log(error)
})

}


  return (
    <div className="hero  md:min-h-screen mt-20 md:mt-0 space-y-14  gap-8 md:flex  justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl space-y-5">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleSubmit(onSubmit)} >
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { require: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input"
              placeholder="Password"
            />

            <button type="submit" className="btn bg-cyan-300 w-full mt-4">
              Login
            </button>

            <SocilaLoging></SocilaLoging>
          </form>
          <p>
            New to this site ? please
            <Link state={{from}}
              className=" text-blue-500 underline ml-2 font-bold"
              to="/Rigester"
            >
              Regester
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
