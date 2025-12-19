import React from 'react';
import useSecureInstance from '../../hooks/SecureInstance';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';

const AdminAnalitics = () => {
    const Instance=useSecureInstance()
    const {data:analiticsInfo,isLoading}=useQuery({
        queryKey:['analiticsInfo'],
        queryFn:async()=>{
         const res=await Instance.get('/scholarship/analitics')
         return res.data   
        }
    })
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    console.log(analiticsInfo)
        return (
        <div>
            This is admin analitics page
        </div>
    );
};

export default AdminAnalitics;