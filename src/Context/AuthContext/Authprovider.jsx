import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebaseinit';


const Authprovider = ({children}) => {
    const [Loging ,setLoding] = useState(true)
    const [user,setuser]=useState(null)
    const Creactuser = (email,password)=>{
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const Sigin = (email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }  
    const Updateprofile =profilinfo=>{
      return updateProfile(auth.currentUser ,profilinfo)

    }
    const Logout = ()=>{
      setLoding(true)
      return signOut(auth)
    }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
        setuser(currentuser)
         console.log('user in the auth state change', currentuser)
        setLoding(false)
      })
      return ()=>{
        unsubscribe()
      }
    },[])
      const Authinfo = {
      user,
      setuser,
      Creactuser,
      Sigin ,
      Logout ,
      Loging,
      Updateprofile
    }
    return <AuthContext value={Authinfo}>
  {children}
    </AuthContext>
       
};

export default Authprovider;