
import {createBrowserRouter} from "react-router";
import Root from "../Layout/Root";
import Home from "./pages/Home/Home";
import AvailableCamps from "./pages/AvailableCamps/AvailableCamps";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "./pages/Authenticarion/Login/Login";
import Rigester from "./pages/Authenticarion/Rigester/Rigester";
import DashboardLayout from "../Layout/DeshboardLayout/DeshboardLayour";
import AddCamp from "./pages/Deshboard/AddCamp";

// import JoinCampModal from "./pages/JoinCampModal/JoinCampModal"
 import CampDetails from "./pages/CampDitels/CampDitels";
import MangeCamps from "./pages/Deshboard/MangeCamps";
import Update from "./pages/Deshboard/UpdateData/Update";


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
      Component:DashboardLayout,
      children:[
        {
          path:'AddCamp',
          Component:AddCamp 
        },
        {
          path:'ManageCamps',
          Component:MangeCamps
        },
        {
          path:'Update/:id',
          Component:Update
          
        }
      ]
    }

  ]);