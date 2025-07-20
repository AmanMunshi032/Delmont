
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
import ManageRegisteredCamps from "./pages/Deshboard/ManageRegisteredCamps";
import Analytics from "./pages/Deshboard/ParticipantDashboard/Analytics";
import ParticipantProfile from "./pages/Deshboard/ParticipantDashboard/ParticipantProfile";
import RegisteredCamps from "./pages/Deshboard/ParticipantDashboard/RegisterCamps";
import Payment from "./pages/Deshboard/Payment/Payment";
import Paymenthestory from "./pages/Deshboard/Payment/Paymenthestory/Paymenthestory";
import Error from "../Error/Error";
import Forbidden from "./pages/Forbiddent/Forbidden";
import Adminroute from "../router/Adminroute";


  export const router = createBrowserRouter([
    {
      path: "/",
      Component:Root ,
       errorElement:<Error></Error>,
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
        },
        {
          path:'/Forbidden',
          Component:Forbidden
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
          element:<Adminroute> <AddCamp></AddCamp> </Adminroute>
        },
        {
          path:'ManageCamps',
         element:<Adminroute> <MangeCamps></MangeCamps></Adminroute>
        },
        {
          path:'Update/:campId',
          element:<Adminroute> <Update></Update></Adminroute>
          
        },
        {
           path:'ManageRegisteredCamps',
           
           element:<Adminroute><ManageRegisteredCamps></ManageRegisteredCamps> </Adminroute>
        },
        // Participant Dashboard
         {
           path:'Analytics',
           Component:Analytics
         },
         {
          path:'ParticipantProfile',
          Component:ParticipantProfile
         },
         {
          path:'RegisteredCamps',
          Component: RegisteredCamps
         },
         {
          path:'Payment/:ParticipantId',
          Component:Payment
         },
         {
          path:'Paymenthestory',
          Component:Paymenthestory
         }
      ]
    }

  ]);