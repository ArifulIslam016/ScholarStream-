import React from 'react';
import useAuthhooks from '../../hooks/Authhooks';
import { useQuery } from '@tanstack/react-query';
import useSecureInstance from '../../hooks/SecureInstance';

const MyApllications = () => {
    const {user}=useAuthhooks()
    const Instance=useSecureInstance()
    const {data:applicationsData,}=useQuery({
        queryKey:["applications",user],
        queryFn:async()=>{
            const res=await Instance.get(`/applications?email=${user.email}`)
            return res.data
        }
    })
    console.log(applicationsData)
    return (
        <div>
            <h1>This is my applicaltion section</h1>
        </div>
    );
};

export default MyApllications;