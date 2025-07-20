import axios, { Axios } from 'axios';
import React from 'react';
const useAxious = axios.create({
     baseURL: `https://delmont-server.vercel.app`
})
const UseAxious = () => {
    return  useAxious
};

export default UseAxious;