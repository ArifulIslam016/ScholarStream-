import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAuthhooks from "../hooks/Authhooks";
import useSecureInstance from "../hooks/SecureInstance";

const DetailedScholarship = () => {
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const id = useParams().id;
  const { data: scholarshipDetails } = useQuery({
    queryKey: ["scholarshipDetails"],
    queryFn: async () => {
      const res = await Instance.get(`/scholarship/${id}`);
      // console.log(res)
      return res.data;
    },
  });
  // console.log(scholarshipDetails)
  return (
    <div>
      <div className="bg-base-200/60 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4 text-sm text-gray-500 flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-primary">ScholarStream</span>
            <span>/</span>
            <span>{scholarshipDetails?.universityName}</span>
            <span>/</span>
            <span className="font-medium text-gray-700">
              {scholarshipDetails?.scholarshipName}
            </span>
          </div>

          <div className="bg-base-100 shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 gap-0 ">
            <div className="relative">
              <img
                src={scholarshipDetails?.universityImage}
                alt={scholarshipDetails?.universityName}
                className="w-full max-h-[420px] object-cover"
              />

              <div className="absolute  via-black/90 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
                  {scholarshipDetails?.scholarshipName} Scholarship
                </h1>

                <p className="text-sm opacity-90">
                  World Rank #{scholarshipDetails?.universityWorldRank}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge badge-primary">
                    {scholarshipDetails?.scholarshipCategory}
                  </span>
                  <span className="badge ">{scholarshipDetails?.degree}</span>
                  <span className="badge badge-outline badge-sm">
                    {scholarshipDetails?.subjectCategory}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-base-200/70">
                  <p className="text-xs font-semibold  text-gray-500 mb-1">
                    Application Deadline
                  </p>
                  <p className="text-lg font-semibold">
                    {scholarshipDetails?.applicationDeadline
                      ? new Date(
                          scholarshipDetails.applicationDeadline
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted on{" "}
                    {scholarshipDetails?.postdate &&
                      new Date(scholarshipDetails.postdate).toLocaleDateString(
                        "en-GB"
                      )}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-base-200/70">
                  <p className="text-xs font-semibold  text-gray-500 mb-1">
                    Location
                  </p>
                  <p className="font-semibold text-base">
                    {scholarshipDetails?.universityCity},
                    {scholarshipDetails?.universityCountry}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    University: {scholarshipDetails?.universityName}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gray-100 border border-base-200">
                  <p className="text-xs font-semibold  text-gray-500 mb-1">
                    Tuition Fees
                  </p>
                  <p className="text-xl font-semibold">
                    ${scholarshipDetails?.tuitionFees}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-100 border border-base-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    Application Fees
                  </p>
                  <p className="text-xl font-semibold">
                    ${scholarshipDetails?.applicationFees}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-100 border border-base-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    Service Charge
                  </p>
                  <p className="text-xl font-semibold">
                    ${scholarshipDetails?.serviceCharge}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Posted by:{" "}
                <span className="font-medium">
                  {scholarshipDetails?.postedUserEmail}
                </span>
              </div>

              <div className="pt-2">
                <button className="btn btn-primary w-full md:w-auto px-8 text-sm font-semibold tracking-wide">
                  Apply for Scholarship
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedScholarship;
