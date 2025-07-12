import axios, { Axios } from 'axios';
import React from 'react';
const useAxious = axios.create({
     baseURL: `http://localhost:5000`
})
const UseAxious = () => {
    return  useAxious
};

export default UseAxious;