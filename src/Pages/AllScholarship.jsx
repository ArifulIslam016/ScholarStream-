import React from "react";
import useSecureInstance from "../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../Components/ScholarshipCard/ScholarshipCard";
import { motion } from "motion/react";
import LoadingPage from "./LoadingPage/LoadingPage";

const AllScholarship = () => {
  const Instance = useSecureInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["allScholarship"],
    queryFn: async () => {
      const res =await Instance.get(`/scholarships`);
      console.log(res)
      return res.data;
    },
  });
  if(isLoading){
    return <LoadingPage></LoadingPage>
  }
//   console.log(data)
  return (
    <div className="my-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl text-center font-bold text-[#1d695e] "
      >
        All Scholarship
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {data.ScholarshipData.map((scholarshipdata, index) => {
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
