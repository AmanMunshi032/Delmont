import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebaseinit';


const Authprovider = ({children}) => {
    const [Loging ,setLoding] = useState(true)
    const Creactuser = (email,password)=>{
        setLoding(false)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const Authinfo = {
      Creactuser,
    }
    return <AuthContext value={Authinfo}>
  {children}
    </AuthContext>
       
};

export default Authprovider;