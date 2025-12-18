import React from "react";
import { useNavigate } from "react-router";

const Errorpage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-7  mt-20 justify-center items-center ">
      <h1 className="text-4xl text-center title font-bold">Opps...!</h1>
      <h1 className="text-2xl text-center text-gray-700 font-semiboldbold">
        Page Not Fount
      </h1>
      <div onClick={() => navigate(-1)} className="btn btn-primary max-w-fit flex justify-center items-center mb-5 ">
        Go Back<span className="loading loading-ball loading-xl"></span>
      </div>
    </div>
  );
};

export default Errorpage;
