import React, { useState } from "react";
import useSecureInstance from "../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../Components/ScholarshipCard/ScholarshipCard";
import { motion } from "motion/react";
import LoadingPage from "./LoadingPage/LoadingPage";
import { CiFilter } from "react-icons/ci";

const AllScholarship = () => {
  const Instance = useSecureInstance();
  const [searchKey,setSearchKey]=useState('')
  const [catagory,setCatagory]=useState('')
  const [sortby, setSortby]=useState('')
  const [order,setOrder]=useState()
  const { data, isLoading, } = useQuery({
    queryKey: ["allScholarship",searchKey,catagory,sortby,order],
    queryFn: async () => {
      const res = await Instance.get(`/scholarships?search=${searchKey}&catagory=${catagory}&sortby=${sortby}&order=${order}`);
      return res.data;
    },
  });
  const handleSort=(key)=>{
    setSortby(key.split('-')[0])
    setOrder(key.split('-')[1])
  }
//   if (isLoading) {
//     return  <div className="text-center  flex justify-center items-center text-blue-400 font-extrabold">
//       <h1 className="text-4xl">
//         L<span className="loading loading-spinner loading-xs"></span>
//         ading
//       </h1> </div>;
//   }
  //   console.log(data)
  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1 className="text-2xl pl-1 md:pl-3 font-bold text-[#1d695e] ">
          Total {data?.ScholarshipData?.length} Scholarships Found
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-2">
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
          {/* Filter functionality here */}
          <div className="dropdown dropdown-center">
                   <button tabIndex={20} role="button" className="btn py-1 btn-outline">
                      <CiFilter /> catagory
                   </button>
                   <ul
                     tabIndex="-1"
                     className="dropdown-content  menu bg-base-100 rounded-box z-999 w-52 p-2 space-y-2 shadow-sm"
                   >
                     <li>
                       <button onClick={() => setCatagory("")} className="btn">
                         All
                       </button>
                     </li>
                     <li>
                       <button
                         onClick={() => setCatagory("Self-fund")}
                         className="btn"
                       >
                         Self-fund
                       </button>
                     </li>
         
                     <li>
                       <button
                         onClick={() => setCatagory("Partial")}
                         className="btn "
                       >
                         Partial
                       </button>
                     </li>
         
                     <li>
                       <button
                         onClick={() => setCatagory("Full fund")}
                         className="btn"
                       >
                         Full fund
                       </button>
                     </li>
                   </ul>
                 </div>
                 {/* Sort Functionality here */}
          <div className="dropdown dropdown-left">
                   <button tabIndex={20} role="button" className="btn py-1 btn-outline">
                     Sort
                   </button>
                   <ul
                     tabIndex="-1"
                     className="dropdown-content  menu bg-base-100 rounded-box z-999 w-52 p-2 space-y-2 shadow-sm"
                   >
                     <li>
                       <button onClick={() => handleSort("")} className="btn">
                         All
                       </button>
                     </li>
                     <li>
                       <button
                         onClick={() => handleSort("postdate-dsc")}
                         className="btn"
                       >
                        Post Date First to last
                       </button>
                     </li>
                     <li>
                       <button
                         onClick={() => handleSort("postdate-asc")}
                         className="btn"
                       >
                        Post Date last to frist
                       </button>
                     </li>
                     <li>
                       <button
                         onClick={() => handleSort("applicationDeadline-dsc")}
                         className="btn"
                       >
                        Deadline end last
                       </button>
                     </li>
                    
         
                     <li>
                       <button
                         onClick={() => handleSort("applicationDeadline-asc")}
                         className="btn"
                       >
                        Deadline end frist
                       </button>
                     </li>
                     <li>
                       <button
                         onClick={() => handleSort("universityWorldRank-asc")}
                         className="btn"
                       >
                        Top Rank
                       </button>
                     </li>
                     
                   </ul>
                 </div>
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
