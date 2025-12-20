import React, { useRef, useState } from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import useAuthhooks from "../../hooks/Authhooks";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { FaRegEdit, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { CiStar } from "react-icons/ci";

const MyReview = () => {
  const Instance = useSecureInstance();
  const { user } = useAuthhooks();
  const [rateStarNo, setRateStarNo] = useState(0);
  const [selectedReview, setselectedReview] = useState({});
  const ratingArray = [1, 2, 3, 4, 5];
  const EditingReviewModalRef = useRef();
  //   if (userLoading) {
  //     return <LoadingPage></LoadingPage>;
  //   }
  const { data: reviews = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await Instance.get(`/reviews?email=${user.email}`);
      //   console.log(res.data);
      return res.data;
    },
  });
  const handleEditModal = async (review) => {
    setselectedReview(review);
    EditingReviewModalRef.current.showModal();
  };
  const hanldeDeleteReview = async (review) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Your review would be parmenetly delte",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await Instance.delete(`/reviews/${review._id}`);
          // console.log(res.data);
          if (res.data.deletedCount) {
            reviewRefetch();
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your Review has been deleted.",
              icon: "success",
            });
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your review record is safe :)",
            icon: "error",
          });
        }
      });
  };
  const handleEditReview = async (e) => {
    e.preventDefault();
    const updatedInfo = {
      reviewStar: rateStarNo,
      reviewComment: e.target.updatedReviewCommnet.value,
    };
    const res = await Instance.patch(`/reviews/${selectedReview._id}/edit`,updatedInfo);
    // console.log(res);
    if (res.data.modifiedCount) {
        reviewRefetch()
      Swal.fire({
        title: "Thank you!",
        text: "Your feedback will inspire us!",
        icon: "success",
      });
      setRateStarNo(0);
      setselectedReview({})
      EditingReviewModalRef.current.close();
    }
  };
  return (
    <div>
      <h1 className="text-xl title font-medium">
        Total {reviews.length} Reviews found
      </h1>
      <div className="overflow-x-auto w-full p-4">
        <table className="table table-zebra w-full">
          {/* Head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th>Review Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <th>{index + 1}</th>
                <td>{review.scholarshipName}</td>
                <td>{review.universityName}</td>
                <td>{review.reviewComment}</td>
                <td>
                  {review.postAt
                    ? new Date(review.postAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{review.reviewStar}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => handleEditModal(review)}
                    className="btn hover:tooltip bg-amber-100 tooltip-primary"
                    data-tip="Edit Review"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => hanldeDeleteReview(review)}
                    className="btn hover:tooltip text-red-400 tooltip-primary"
                    data-tip="Delete Review"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Review edit Modal */}
      <dialog ref={EditingReviewModalRef} className="modal">
        <div className="modal-box">
          <form onSubmit={handleEditReview} className="flex flex-col gap-2">
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
            // defaultValue={selectedReview.reviewComment}
              required={true}
              type="text"
              className="textarea w-full"
              placeholder="Your message here..."
              name="updatedReviewCommnet"
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

export default MyReview;
