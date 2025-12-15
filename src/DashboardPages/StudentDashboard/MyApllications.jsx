import React from "react";
import useAuthhooks from "../../hooks/Authhooks";
import { useQuery } from "@tanstack/react-query";
import useSecureInstance from "../../hooks/SecureInstance";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { BiDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdRateReview } from "react-icons/md";
import usePaymentHooks from "../../hooks/PaymentHooks";

const MyApllications = () => {
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const handlePayments=usePaymentHooks()
  const { data: applicationsData, isLoading } = useQuery({
    queryKey: ["applications", user],
    queryFn: async () => {
      const res = await Instance.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
const handlePaymentFormMyApplicationPage=async(applicationdata)=>{
const scholarshipInfo=await Instance.get(`/scholarship/${applicationdata.scholarshipId}`)
handlePayments(scholarshipInfo.data)
}
  console.log(applicationsData);
  return (
    <div>
      <h1 className="text-xl title font-medium">
        Total {applicationsData.length} application found
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Catagory</th>
              <th>Application Fees</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData.map((data, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.universityName}</td>
                  <td>
                    {data?.universityCountry},{data.universityCity}
                  </td>
                  <td>{data?.feedback}</td>
                  <td>{data?.subjectCatagory}</td>
                  <td>{data?.applicationFees}</td>
                  <td>
                    {data?.applicationStatus === "pending" ? (
                      <span className="text-yellow-400 italic">
                        {data.applicationStatus}
                      </span>
                    ) : data?.applicationStatus === "rejected" ? (
                      <span className="text-red-400 italic">
                        {data.applicationStatus}
                      </span>
                    ) : (
                      <span className="text-green-400-400 italic">
                        {data.applicationStatus}
                      </span>
                    )}
                  </td>
                  <td className="flex gap-1">
                    <button
                      className="btn hover:tooltip  tooltip-primary"
                      data-tip="Details"
                    >
                      <BiDetail />
                    </button>
                    {data.applicationStatus === "pending" && (
                      <button
                        className="btn hover:tooltip  tooltip-primary"
                        data-tip="Edit"
                      >
                        <FaRegEdit />
                      </button>
                    )}
                    {data.paymentStatus === "unpaid" &&
                      data.applicationStatus === "pending" && (
                        <button onClick={()=>handlePaymentFormMyApplicationPage(data)} className="btn btn-primary hover:tooltip  tooltip-primary">
                          Pay
                        </button>
                      )}
                    {data.applicationStatus === "pending" && (
                      <button
                        className="btn hover:tooltip text-red-400 tooltip-primary"
                        data-tip="Delete Application"
                      >
                        <MdDelete />
                      </button>
                    )}
                    {data.applicationStatus === "completed" && (
                      <button
                        className="btn hover:tooltip text-red-400 tooltip-primary"
                        data-tip="Add review"
                      >
                        <MdRateReview />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApllications;
