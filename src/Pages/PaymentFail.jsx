import React from "react";
import { Link } from "react-router";

const PaymentFail = () => {
  return (
    <div className=" flex justify-center items-center flex-col mt-10 space-y-10">
      <h1 className="title text-center text-3xl font-semibold">
        Payment failed
      </h1>
      <Link to="/dashboard/myapplications" className="btn btn-primary flex justify-center items-center">
        <span className="loading loading-spinner loading-xs"></span>
        Retry
      </Link>
    </div>
  );
};

export default PaymentFail;
