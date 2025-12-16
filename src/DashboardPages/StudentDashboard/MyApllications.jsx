import React, { useRef, useState } from "react";
import useAuthhooks from "../../hooks/Authhooks";
import { useQuery } from "@tanstack/react-query";
import useSecureInstance from "../../hooks/SecureInstance";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { BiDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdRateReview } from "react-icons/md";
import usePaymentHooks from "../../hooks/PaymentHooks";
import Swal from "sweetalert2";

const MyApllications = () => {
  const detailsModalRef = useRef();
  const editModalRef = useRef();
  const { user } = useAuthhooks();
  const [detailsModal, setDetailsModal] = useState({});
  const [editsModal, seteEdiMsodal] = useState({});
  const Instance = useSecureInstance();
  const handlePayments = usePaymentHooks();
  const {
    data: applicationsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user],
    queryFn: async () => {
      const res = await Instance.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  const handlePaymentFormMyApplicationPage = async (applicationdata) => {
    const scholarshipInfo = await Instance.get(
      `/scholarship/${applicationdata.scholarshipId}`
    );
    handlePayments(scholarshipInfo.data);
  };
  const handleDetailsModal = (applicationData) => {
    setDetailsModal(applicationData);
    detailsModalRef.current.showModal();
  };
  const handleEditModal = (applicationData) => {
    seteEdiMsodal(applicationData);
    editModalRef.current.showModal();
  };
  const hanldeDeleteApplication = (selectedApplication) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Instance.delete(`/apllications/${selectedApplication._id}`)
          .then((res) => {
            console.log(res);
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your apllication has been deleted.",
                icon: "success",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Something gone wrong!",
              text: "Your apllication not deleted.",
              icon: "error",
            });
          });
      }
    });
  };
  console.log(detailsModal);
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
                      onClick={() => handleDetailsModal(data)}
                      className="btn hover:tooltip  tooltip-primary"
                      data-tip="Details"
                    >
                      <BiDetail />
                    </button>
                    {data.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleEditModal(data)}
                        className="btn hover:tooltip  tooltip-primary"
                        data-tip="Edit"
                      >
                        <FaRegEdit />
                      </button>
                    )}
                    {data.paymentStatus === "unpaid" &&
                      data.applicationStatus === "pending" && (
                        <button
                          onClick={() =>
                            handlePaymentFormMyApplicationPage(data)
                          }
                          className="btn btn-primary hover:tooltip  tooltip-primary"
                        >
                          Pay
                        </button>
                      )}
                    {data.applicationStatus === "pending" && (
                      <button
                        onClick={() => hanldeDeleteApplication(data)}
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
      {/* details modal */}
      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
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
              <strong>Payment Status:</strong> {detailsModal.paymentStatus}
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
      {/* Edit modal */}
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
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

export default MyApllications;
