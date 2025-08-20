import { useState,useEffect, createContext } from "react";
export const UserContext =  createContext()
const Darktheme = ({children}) => {
const [darkMode,setdarkMode]=useState(
   ()=>  localStorage.getItem("theme")=== "dark"
)
useEffect(()=>{
   const root = document.documentElement;
   if(darkMode){
      root.classList.add("dark")
      localStorage.setItem("theme","dark")
   }else{
      root.classList.remove("dark")
      localStorage.setItem("theme","light")
   }
},[darkMode])
   return (
    <UserContext.Provider value={{darkMode,setdarkMode}}>
      {children}
    </UserContext.Provider>
   );
};

export default Darktheme;