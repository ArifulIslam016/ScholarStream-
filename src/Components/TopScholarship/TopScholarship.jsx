import React from "react";
import { motion } from "motion/react";

const TopScholarship = () => {
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
    </div>
  );
};

export default TopScholarship;
