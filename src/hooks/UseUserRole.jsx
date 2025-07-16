import React from 'react';
import useAuth from './UseAuth';
import UseAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseUserRole = () => {
    const {user, Loding:authLoding }= useAuth()
    const axiosSecure = UseAxiosSecure()

 const {
        data: role ='Participant',
        isLoding: roleLoding,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoding && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data.role;
        },
    });



    return { role, roleLoding: authLoding || roleLoding, refetch };
};

export default UseUserRole;