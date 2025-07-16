import axios from 'axios';
import useAuth from './UseAuth'
import { useEffect } from 'react';

 const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
 })
const UseAxiosSecure = () => {
   const {user}=useAuth()
   useEffect(()=>{
     if(user){
       axiosSecure.interceptors.request.use(config=>{
      config.headers.authorization = `Bearer ${user?.accessToken}`  
        return config
    },error=>{
         return Promise.reject(error);
    })
     } 
   },[user])


    return  axiosSecure;
};

export default UseAxiosSecure;