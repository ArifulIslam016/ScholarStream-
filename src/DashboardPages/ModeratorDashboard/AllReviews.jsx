import React from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

const AllReviews = () => {
  const Instance = useSecureInstance();
  const { data: reviews = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await Instance.get(`/reviews?`);
      //   console.log(res.data);
      return res.data;
    },
  });
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
          console.log(res.data);
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
              <th>Student Name</th>
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
                <td>{review.reviewerName}</td>
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
    </div>
  );
};

export default AllReviews;
