import React from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessoinId = searchParams.get("session_id");
  return (
    <div>
      <h1> {sessoinId}</h1>
    </div>
  );
};

export default PaymentSuccess;
