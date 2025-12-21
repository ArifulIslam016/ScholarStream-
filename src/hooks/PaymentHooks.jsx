import React from "react";
import useSecureInstance from "./SecureInstance";
import useAuthhooks from "./Authhooks";
// import { degrees } from "motion";
import Swal from "sweetalert2";

const usePaymentHooks = () => {
  const Instance = useSecureInstance();
  const { user } = useAuthhooks();
  const handlePayments = async (scholarship) => {
    const payingSholcarship = {
      scholarshipId: scholarship._id,
      applicationFees: scholarship.applicationFees,
      userEmail: user.email,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      userId: user?.uid,
      userName: user.displayName,
      paymentStatus: "unpaid",
      serviceCharge: scholarship.serviceCharge,
      degrees: scholarship.degree,
      scholarshipCategory: scholarship.scholarshipCategory,
      applicationStatus: "pending",
      universityCity:scholarship.universityCity,
      universityCountry:scholarship.universityCountry,
      feedback:'Not yet provided',
      subjectCatagory:scholarship.subjectCategory,
    };
    try {
      const res = await Instance.post(
        "/create-checkout-session",
        payingSholcarship
      );
      // console.log(res);
      window.location.assign(res.data.url);
    } catch (err) {
      if (err.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`,
        });
      }
    }
  };
  return handlePayments;
};

export default usePaymentHooks;
