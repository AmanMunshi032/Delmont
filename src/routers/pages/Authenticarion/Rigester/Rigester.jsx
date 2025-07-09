import React from 'react';
import { Link } from 'react-router';
import SocilaLoging from '../../shared/SocilaLoging/SocilaLoging';
import { useForm } from 'react-hook-form';

  // e.preventDefault();
  //   const form = e.target;
  // const formdata = new FormData(form)
  //   const {email,password,} = Object.fromEntries(formdata.entries())
  //     console.log(email,password,)
 
const Rigester = () => {
  const {register,handleSubmit}=useForm() 
  const onsubmit=(data )=>{
    console.log(data)
  }
    return (
         <div className="hero md:min-h-screen md:mt-0 mt-10 ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl space-y-5">
          <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Register now!</h1>
            <form  onSubmit={handleSubmit(onsubmit)} className="fieldset">
              <label className="label">Name</label>
              <input type="text"{...register('name')} name='name' className="input" placeholder="Name" />
              <label className="label">Photo url</label>
              <input type="file"  name='photo' className="input" placeholder="photo url" />
              <label className="label">Email</label>
              <input type="email" {...register('email')} name='email' className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password"{...register('password')} name='password' className="input" placeholder="Password" />
              <button  type='submit' className="btn bg-cyan-300 mt-4">Register</button>
             <SocilaLoging></SocilaLoging>
            </form>

            <p>Already Have an Account? please<Link className=" text-blue-500 underline ml-2 font-bold" to ='/Login'>Login</Link></p>
          </div>
        </div>
    </div>
    );
};

export default Rigester;