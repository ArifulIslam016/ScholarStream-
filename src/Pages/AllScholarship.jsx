import React, { useState } from "react";
import useSecureInstance from "../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../Components/ScholarshipCard/ScholarshipCard";
import { motion } from "motion/react";
import LoadingPage from "./LoadingPage/LoadingPage";

const AllScholarship = () => {
  const Instance = useSecureInstance();
  const [searchKey,setSearchKey]=useState('')
  const [filterKey,setFilterKey]=useState('')
  const { data, isLoading } = useQuery({
    queryKey: ["allScholarship",searchKey],
    queryFn: async () => {
      const res = await Instance.get(`/scholarships?search=${searchKey}`);
      return res.data;
    },
  });
  const handleFilter=(key)=>{
setFilterKey(key)
  }
//   if (isLoading) {
//     return  <div className="text-center  flex justify-center items-center text-blue-400 font-extrabold">
//       <h1 className="text-4xl">
//         L<span className="loading loading-spinner loading-xs"></span>
//         ading
//       </h1> </div>;
//   }
  //   console.log(data)
  console.log(filterKey)
  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1 className="text-2xl pl-1 md:pl-3 font-bold text-[#1d695e] ">
          Total {data?.ScholarshipData?.length} Scholarships Found
        </h1>
        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input defaultValue={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="search" required placeholder="Search" />
          </label>
        </div>
      </div>
      {isLoading&& <LoadingPage></LoadingPage>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {data?.ScholarshipData?.map((scholarshipdata, index) => {
          return (
            <ScholarshipCard
              key={index}
              scholarshipdata={scholarshipdata}
            ></ScholarshipCard>
          );
        })}
      </div>
    </div>
  );
};

export default AllScholarship;
