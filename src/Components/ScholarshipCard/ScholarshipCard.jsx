import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarshipdata }) => {
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    degree,
    applicationFees,
    scholarshipCategory,
    postdate,
  } = scholarshipdata;
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white border-0 p-1 shadow-2xl rounded-xl flex flex-col justify-between h-full overflow-hidden border hover:shadow-xl transition"
    >
      <img
        src={universityImage}
        alt={scholarshipName}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-[#1d695e]">{scholarshipName}</h2>
        <p className="text-sm font-medium text-gray-600">
          {universityName} • {universityCountry}
        </p>

        <p className="text-sm text-gray-700">
          Degree: <span className="font-medium">{degree}</span>
        </p>

        <p className="text-sm text-gray-700">
          Application Fees:{" "}
          <span className="font-semibold">${applicationFees}</span>
        </p>

        <p className="text-xs bg-[#1d695e]/10 text-[#1d695e] w-fit px-2 py-1 rounded-md">
          {scholarshipCategory}
        </p>

        <p className="text-xs text-gray-500">
          Posted on: {new Date(postdate).toLocaleDateString()}
        </p>

        <Link
          to={`/scholarship/${_id}`}
          className="block text-center mt-3  text-white py-2 rounded-lg font-semibold btn  bg-gradient-to-l from-[#16E2F5] to-[#1E90FF] transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
