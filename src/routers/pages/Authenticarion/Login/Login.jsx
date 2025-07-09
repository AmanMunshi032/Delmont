import React from 'react';
import { Link } from 'react-router';
import SocilaLoging from '../../shared/SocilaLoging/SocilaLoging';

const Login = () => {
    const hendelsigin =()=>{

    }
    return (
         <div className="hero  md:min-h-screen mt-20 md:mt-0 space-y-14  gap-8 md:flex  justify-center items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl space-y-5">
          <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
            <form onSubmit={hendelsigin} lassName="fieldset">
              <label className="label">Email</label>
              <input type="email" name='email'  className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password"  name='password'className="input" placeholder="Password" />
              <button type='submit' className="btn bg-cyan-300 w-full mt-4">Login</button>
   
              <SocilaLoging></SocilaLoging>

            </form>
            <p>New to  this site ? please<Link className=" text-blue-500 underline ml-2 font-bold" to ='/Rigester'>Regester</Link></p>
          </div>
        </div>
    </div>
    );
};

export default Login;