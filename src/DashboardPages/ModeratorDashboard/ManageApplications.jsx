import React, { useRef, useState } from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import { BiDetail } from "react-icons/bi";
import { FcFeedback } from "react-icons/fc";
import { TbMailCancel } from "react-icons/tb";

const ManageApplications = () => {
  const Instance = useSecureInstance();
  const detailsModalRef = useRef();
  const [detailsModal, setDetailsModal] = useState({});
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Allapplications"],
    queryFn: async () => {
      const res = await Instance.get(`/applications`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  const handleDetailsModal = (applicationData) => {
    setDetailsModal(applicationData);
    detailsModalRef.current.showModal();
  };
  return (
    <div>
      <h1 className="title text-2xl font-semibold">
        Total {applications.length} application fount
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>University Name</th>
              <th>Feedback</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th>Application Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((data, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.userName}</td>
                  <td>{data.userEmail}</td>
                  <td>{data.universityName}</td>
                  <td>{data?.feedback}</td>
                  <td>
                    {data?.applicationStatus === "pending" ? (
                      <span className="text-yellow-400 text-lg italic">
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
                  <td>
                    {data?.paymentStatus === "paid" ? (
                      <span className="bg-green-500 py-2 px-4  rounded-xl text-white">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-red-500 p-2 rounded-xl text-white">
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td>{data?.applicationFees}</td>
                  <td className="flex gap-1">
                    <button
                      onClick={() => handleDetailsModal(data)}
                      className="btn hover:tooltip bg-gray-300 tooltip-primary"
                      data-tip="Details"
                    >
                      <BiDetail />
                    </button>
                    <button
                      className="btn hover:tooltip bg-amber-100  tooltip-primary"
                      data-tip="Give Feedback"
                    >
                      <FcFeedback />
                    </button>
                    <div className="dropdown">
                      <button
                        tabIndex={20}
                        role="button"
                        className="btn py-1 btn-primary"
                      >
                        Update
                      </button>
                      <ul
                        tabIndex="-1"
                        className="dropdown-content  menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <button className="btn">Proceesing</button>
                        </li>
                        <li>
                          <button className="btn">Completed</button>
                        </li>
                      </ul>
                    </div>
                    <button
                      className="btn hover:tooltip bg-red-300 tooltip-primary"
                      data-tip="Reject"
                    >
                      <TbMailCancel />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box text-gray-700">
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold">
              {detailsModal.scholarshipName}
            </h2>

            <div>
              <strong>User Name:</strong> {detailsModal.userName}
            </div>
            <div>
              <strong>Email:</strong> {detailsModal.userEmail}
            </div>
            <div>
              <strong>University:</strong> {detailsModal.universityName}
            </div>
            <div>
              <strong>Degree:</strong> {detailsModal.degrees}
            </div>
            <div>
              <strong>Category:</strong> {detailsModal.scholarshipCategory}
            </div>
            <div>
              <strong>Application Fees:</strong> ${detailsModal.applicationFees}
            </div>
            <div>
              <strong>Service Charge:</strong> ${detailsModal.serviceCharge}
            </div>
            <div>
              <strong>Application Status:</strong>{" "}
              {detailsModal.applicationStatus}
            </div>
            <div>
              <strong>Payment Status:</strong>{" "}
              {detailsModal.paymentStatus === "paid" ? (
                <span className="text-green-500">Paid</span>
              ) : (
                <span className="text-red-500">Unpaid</span>
              )}
            </div>
            <div>
              <strong>Applied On:</strong>{" "}
              {detailsModal.applicationDate &&
                new Date(detailsModal.applicationDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Transition ID:</strong> {detailsModal.transitionId}
            </div>
            <div>
              <strong>Scholarship ID:</strong> {detailsModal.scholarshipId}
            </div>
            <div>
              <strong>User ID:</strong> {detailsModal.userId}
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplications;
