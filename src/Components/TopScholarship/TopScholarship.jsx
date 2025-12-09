import React from "react";
import { motion } from "motion/react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";

const TopScholarship = () => {
  const Instance=useSecureInstance()
  const {data:topScholarships=[],isLoading}=useQuery({
    queryKey:['topScholarship'],
    queryFn:async()=>{
     const res=await Instance.get(`/scholarships?sortby=postdate&order=desc`)
     return res.data.ScholarshipData
    }
  })
  console.log(topScholarships)
  if(isLoading){
    return <span className="loading loading-ring loading-xl"></span>

  }
  return (
    <div className="py-4 md:py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl text-center font-bold text-[#1d695e] "
      >
        Top Scholarship
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {topScholarships.map((scholarshipdata,index)=>{
         return <ScholarshipCard key={index} scholarshipdata={scholarshipdata}></ScholarshipCard>
        })}
      </div>
    </div>
  );
};

export default TopScholarship;
