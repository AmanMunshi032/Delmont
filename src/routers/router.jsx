
import {createBrowserRouter, } from "react-router";
import Root from "../Layout/Root";
import Home from "./pages/Home/Home";
import AvailableCamps from "./pages/AvailableCamps/AvailableCamps";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "./pages/Authenticarion/Login/Login";
import Rigester from "./pages/Authenticarion/Rigester/Rigester";
import DashboardLayout from "../Layout/DeshboardLayout/DeshboardLayour";
import AddCamp from "./pages/Deshboard/AddCamp";
 import CampDetails from "./pages/CampDitels/CampDitels";
import MangeCamps from "./pages/Deshboard/MangeCamps";
import Update from "./pages/Deshboard/UpdateData/Update";
import OrganizerProfile from "./pages/Deshboard/OrganizerProfile";
import PrivetRouter from "../router/PrivetRouter";


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
          element:<AvailableCamps></AvailableCamps>
        },
        {
          path:'/CampDetails/:campId',
          Component:CampDetails
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
    
    },
    {
      path:'/dashboard',
       element:<PrivetRouter>
        <DashboardLayout></DashboardLayout>
       </PrivetRouter>,
      children:[

        {
         path:'OrganizerProfile',
         Component:OrganizerProfile
        
        },
        {
          path:'AddCamp',
          Component:AddCamp 
        },
        {
          path:'ManageCamps',
          Component:MangeCamps
        },
        {
          path:'Update/:updateId',
          Component:Update,
          
        }
      ]
    }

  ]);