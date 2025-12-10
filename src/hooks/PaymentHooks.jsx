import React from 'react';
import useSecureInstance from './SecureInstance';
import useAuthhooks from './Authhooks';

const usePaymentHooks = () => {
    const Instance=useSecureInstance()
    const {user}=useAuthhooks()
    const handlePayments=async(scholarship)=>{
        const payingSholcarship={
           scholarshipId:scholarship._id,
           applicationFees:scholarship.applicationFees,
           studentEmail:user.email,
           scholarshipName:scholarship.scholarshipName,
           universityName:scholarship.universityName
        }
        const res=await Instance.post('/create-checkout-session',payingSholcarship)
        console.log(res)
        window.location.assign(res.data.url)
    }
    return handlePayments;
};

export default usePaymentHooks;