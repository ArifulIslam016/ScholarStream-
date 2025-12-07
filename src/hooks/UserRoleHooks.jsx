import React from 'react';
import useSecureInstance from './SecureInstance';
import useAuthhooks from './Authhooks';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';

const useUserRoleHooks = () => {
    const {user}=useAuthhooks()
    const Instance=useSecureInstance()
    const {data:role,isLoading}=useQuery({
        queryKey:['userRole',user.email],
        queryFn:async()=>{
            const res=await Instance.get(`/users?email=${user.email}`)
            return (res.data.role)
        }
    })
   
    return( {role,isLoading})
};

export default useUserRoleHooks;