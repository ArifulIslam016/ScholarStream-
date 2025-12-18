import React from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaRegEdit, FaTrash } from "react-icons/fa";

const MangeScholarship = () => {
  const Instance = useSecureInstance();
  const { data: allscholarships = [] } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await Instance.get("/scholarships");
      return res.data;
    },
  });
  console.log(allscholarships);
  return (
    <div>
      <h1 className="text-xl title font-medium">
        Total {allscholarships.ScholarshipData.length} scholarships found
      </h1>
      <div className="overflow-x-auto w-full p-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Country</th>
              <th>City</th>
              <th>Degree</th>
              <th>Category</th>
              <th>Application Fees</th>
              <th>World Rank</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {allscholarships.ScholarshipData.map((scholarship, index) => (
              <tr key={scholarship._id}>
                <th>{index + 1}</th>
                <td>{scholarship.scholarshipName}</td>
                <td>{scholarship.universityName}</td>
                <td>{scholarship.universityCountry}</td>
                <td>{scholarship.universityCity}</td>
                <td>{scholarship.degree}</td>
                <td>{scholarship.scholarshipCategory}</td>
                <td>${scholarship.applicationFees}</td>
                <td>{scholarship.universityWorldRank}</td>

                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-ghost tooltip tooltip-primary"
                      data-tip="Update"
                    >
                      <FaRegEdit></FaRegEdit>
                    </button>

                    <button
                      className="btn btn-ghost text-red-500 tooltip tooltip-warning"
                      data-tip="Delete"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeScholarship;
