import React from 'react';
import useAuthhooks from '../../hooks/Authhooks';
import { useQuery } from '@tanstack/react-query';
import useSecureInstance from '../../hooks/SecureInstance';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';

const MyApllications = () => {
    const {user}=useAuthhooks()
    const Instance=useSecureInstance()
    const {data:applicationsData,isLoading}=useQuery({
        queryKey:["applications",user],
        queryFn:async()=>{
            const res=await Instance.get(`/applications?email=${user.email}`)
            return res.data
        }
    })
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    console.log(applicationsData)
    return (
        <div>
            <h1 className='text-xl title font-medium'>Total {applicationsData.length} application found</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>University Name</th>
        <th>University Address</th>
        <th>Feedback</th>
        <th>Subject Catagory</th>
        <th>Application Fees</th>
        <th>Application Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {applicationsData.map((data,index)=>{
       return <tr key={index}>
        <th>{index+1}</th>
        <td>{data.universityName}</td>
        <td>{data?.universityCountry},{data.universityCity}</td>
        <td>{data?.feedback}</td>
        <td>{data?.subjectCatagory}</td>
        <td>{data?.applicationFees}</td>
        <td>{data?.applicationStatus}</td>
        <td>
            <button className='btn'>Details </button>
        </td>
      </tr>
      })}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyApllications;