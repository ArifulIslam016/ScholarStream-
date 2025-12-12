import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useSecureInstance from "../hooks/SecureInstance";
// import { div } from "motion/react-client";
import LoadingPage from "./LoadingPage/LoadingPage";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymnetInfo, setPaymentInfo] = useState();
  const Instance = useSecureInstance();
  const sessoinId = searchParams.get("session_id");
  const [loading,setloading]=useState(true)
  useEffect(() => {
    Instance.patch(`/applicationFeeStatus-status?sessoinId=${sessoinId}`).then(
      (res) => {
        setPaymentInfo(res.data);
        setloading(false)
      }
    );
  }, [sessoinId, Instance]);
  if(loading){
    return <LoadingPage></LoadingPage>
  }
  return (
    <div className="w-11/12 my-10 space-y-3 text-center">
      <h1 className="title text-3xl font-bold">Thanks for you payment</h1>
     <div className="flex justify-center items-center gap-5 w-fit flex-wrap mx-auto rounded-3xl bg-gray-300 p-10">
       <p className="badge badge-primary p-3">
        Paid Amount:
        {paymnetInfo ? (
          paymnetInfo.metadata.paidAmount
        ) : (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </p>
      <p className="p-4 text-gray-800 text-sm md:text:lg md:p-0 w-full md:w-fit text-center">
        Transition Id: {' '}
         {paymnetInfo ? (
          paymnetInfo.payment_intent
        ) : (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </p>
     </div>
     <div>
      <h1 className="italic">You succesfully apllied for{paymnetInfo.metadata.scholarshipName} of {paymnetInfo.metadata.universityName}</h1>
     </div>
     <Link className="btn">Go to My apllication</Link>
    </div>
  );
};

export default PaymentSuccess;
