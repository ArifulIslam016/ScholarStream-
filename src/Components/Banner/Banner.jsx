import React from "react";
import studentImg from "../../assets/StudentImg.png";
import { easeOut, motion } from "motion/react";
const Banner = () => {
  return (
    <div className="w-full  bg-[#eafaf9] text-[#1d695e] pt-1 flex flex-col md:flex-row justify-between items-center">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-7  w-10/12 mx-auto pl-4 md:pl-10"
      >
        <h1 className="text-4xl font-bold text-[#1d695e] ">
          Find Your Dream <br /> Scholarship{" "}
        </h1>
        <p className="w-10/12">
          Unlock your future with scholarships that open doors to global
          education. Find the perfect scholarship and take the next step toward
          success.
        </p>
        <button className="btn  bg-gradient-to-l from-[#16E2F5] to-[#1E90FF]">
          Find Scholarship
        </button>
      </motion.div>
      <motion.img initial={{scale:0.8,opacity:0}} whileInView={{scale:1,opacity:1}} transition={{duration:1,delay:0.2,ease:easeOut}} className="max-w-[400px]" src={studentImg} alt="" />
    </div>
  );
};

export default Banner;
