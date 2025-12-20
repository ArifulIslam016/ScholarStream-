import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./style.css";
import { EffectCards } from "swiper/modules";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { MdStarRate } from "react-icons/md";

const ScholarshipReview = ({ id }) => {
  const Instance = useSecureInstance();

  const { data: scholarshipReviews, isLoading } = useQuery({
    queryKey: ["scholarshipReviews"],
    queryFn: async () => {
      const res = await Instance.get(`/reviews/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  // console.log(scholarshipReviews);

  return (
    <div className="mb-10">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {scholarshipReviews.map((review, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="max-w-11/12 mx-auto border-l border-gray-400 rounded-2xl bg-gray-200 p-6">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-400"
                  />
                  <div>
                    <h4 className="font-bold text-lg capitalize text-black">
                      {review.reviewerName}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  {[...Array(review.reviewStar)].map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < review.reviewStar
                          ? "text-yellow-600 text-xl"
                          : "text-gray-400 text-xl"
                      }
                    >
                      <MdStarRate />
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-800">
                    ({review.reviewStar}/5)
                  </span>
                </div>

                <p className="bg-gray-100 p-4 text-sm rounded-lg italic text-gray-900 shadow-sm">
                  "{review.reviewComment}"
                </p>

                <div className="mt-2 text-xs title font-bold uppercase tracking-tight">
                  {review.scholarshipName} — {review.universityName}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ScholarshipReview;
