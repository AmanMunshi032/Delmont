import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebaseinit';

 const googleprovider = new GoogleAuthProvider()
const Authprovider = ({children}) => {
    const [Loding ,setLoding] = useState(true)
    const [user,setuser]=useState(null)
   
    const Creactuser = (email,password)=>{
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const Sigin = (email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }  

    const siginGoogle = ()=>{
      setLoding(true)
     return signInWithPopup(auth, googleprovider)
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
        //  console.log('user in the auth state change', currentuser)
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
      Loding,
      siginGoogle,
      Updateprofile
    }
    return <AuthContext value={Authinfo}>
  {children}
    </AuthContext>
       
};

export default Authprovider;