import React, { useRef, useState } from "react";
import useAuthhooks from "../../hooks/Authhooks";
import { useQuery } from "@tanstack/react-query";
import useSecureInstance from "../../hooks/SecureInstance";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { BiDetail } from "react-icons/bi";
import { FaRegEdit, FaStar } from "react-icons/fa";
import { MdDelete, MdRateReview } from "react-icons/md";
import usePaymentHooks from "../../hooks/PaymentHooks";
import Swal from "sweetalert2";
import { CiStar } from "react-icons/ci";

const MyApllications = () => {
  const detailsModalRef = useRef();
  const editModalRef = useRef();
  const reviewModalRef = useRef();
  const { user } = useAuthhooks();
  const [detailsModal, setDetailsModal] = useState({});
  const [editsModal, seteEdiMsodal] = useState({});
  const [reviewedScholarship, setRviewScholarship] = useState({});
  const [rateStarNo, setRateStarNo] = useState(0);
  const Instance = useSecureInstance();
  const ratingArray = [1, 2, 3, 4, 5];
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
  const handleEditApplication = async (e) => {
    e.preventDefault();
    editModalRef.current.close();
    console.log(e.target.email);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Instance.patch(
          `/apllications/${editsModal._id}`,
          {
            name: e.target.name.value,
          }
        );
        console.log(response);
        if (response.data.modifiedCount) {
          Swal.fire("Saved!", "", "success");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved");
      }
    });
  };
  const hanleReview = async (e) => {
    e.preventDefault();
    const reviewInfo = {
      scholarshipName: reviewedScholarship.scholarshipName,
      scholarshipId: reviewedScholarship.scholarshipId,
      appplicationId: reviewedScholarship._id,
      universityCity: reviewedScholarship.universityCity,
      universityCountry: reviewedScholarship.universityCountry,
      universityName: reviewedScholarship.universityName,
      //   userEmail:reviewedScholarship.universityCountry,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      reviewerName: user.displayName,
      reviewComment: e.target.reviewCommnet.value,
      reviewStar: parseInt(rateStarNo),
    };
    console.log(reviewInfo);
    const res = await Instance.post("/reviews", reviewInfo).catch((err) => {
      if (err.status === 400) {
        reviewModalRef.current.close();
        setRateStarNo(0);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`,
        });
      }
    });
    console.log(res);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Thank you!",
        text: "Your feedback will inspire us!",
        icon: "success",
      });
      setRateStarNo(0);
      reviewModalRef.current.close();
    }
  };
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
                    ) : data?.applicationStatus === "Rejected" ? (
                      <span className="text-red-400 italic">
                        {data.applicationStatus}
                      </span>
                    ) : data?.applicationStatus === "Processing" ? (
                      <span className="text-blue-400 italic">
                        {data.applicationStatus}
                      </span>
                    ) : (
                      <span className="text-green-400 italic">
                        {data.applicationStatus}
                      </span>
                    )}
                  </td>
                  <td
                    className="flex gap-1"
                    tabIndex='-1'>
                    <button
                      onClick={() => handleDetailsModal(data)}
                      className="btn hover:tooltip bg-gray-300 tooltip-primary"
                      data-tip="Details"
                    >
                      <BiDetail />
                    </button>
                    {data.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleEditModal(data)}
                        className="btn hover:tooltip bg-amber-100 tooltip-primary"
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
                    {data.applicationStatus === "Completed" && (
                      <button
                        onClick={() => {
                          setRviewScholarship(data);
                          reviewModalRef.current.showModal();
                        }}
                        className="btn hover:tooltip text-green-400 tooltip-primary"
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
      {/* details modal here  */}
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
          <form onSubmit={handleEditApplication}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                defaultValue={editsModal.userName}
                type="text"
                className="input"
                name="name"
              />
              <label className="label">Email (Not Editable)</label>
              <input
                value={editsModal.userEmail}
                type="email"
                className="input"
                placeholder="Email"
              />
              <input
                className="btn bg-linear-to-l from-[#16E2F5] to-[#1E90FF] w-full mt-5"
                type="submit"
                value={"Update"}
              />
            </fieldset>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Details Modal */}
      <dialog ref={reviewModalRef} className="modal">
        <div className="modal-box">
          <form onSubmit={hanleReview} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-xl "> Rate:</h1>
              {ratingArray.map((rateNo) => (
                <span
                  key={rateNo}
                  onClick={() => setRateStarNo(rateNo)}
                  className="text-yellow-300"
                >
                  {rateStarNo >= rateNo ? <FaStar /> : <CiStar />}
                </span>
              ))}
            </div>
            <textarea
              required={true}
              type="text"
              className="textarea w-full"
              placeholder="Your message here..."
              name="reviewCommnet"
              defaultValue=""
            />
            <button
              className="btn bg-linear-to-l text-white  from-[#16E2F5] to-[#1E90FF]"
              type="submit"
            >
              Submit
            </button>
          </form>
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
