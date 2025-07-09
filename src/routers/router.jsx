
import {createBrowserRouter} from "react-router";
import Root from "../Layout/Root";
import Home from "./pages/Home/Home";
import AvailableCamps from "./pages/AvailableCamps/AvailableCamps";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "./pages/Authenticarion/Login/Login";
import Rigester from "./pages/Authenticarion/Rigester/Rigester";
  export const router = createBrowserRouter([
    {
      path: "/",
      Component:Root ,
       
      children:[
        {
          index: true,
           Component:Home,
        },
        {
          path:'/AvailableCamps',
          Component:AvailableCamps
        }
        
      
      ]
    },
    {
      path:'/',
      Component:AuthLayout,
      children:[
        {
          path:'Login',
          Component:Login
        },
        {
          path:'Rigester',
          Component:Rigester
        }
      ]
    }
  ]);