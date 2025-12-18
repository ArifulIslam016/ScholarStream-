import React, { useRef, useState } from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaRegEdit, FaTrash } from "react-icons/fa";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { useForm } from "react-hook-form";

const MangeScholarship = () => {
  const Instance = useSecureInstance();
  const [formLoading, setformLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const editScholarshipModalref = useRef();
  const [selectedScholarship, setSelectedScholarship] = useState({});
  const { data: allscholarships = [], isLoading } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await Instance.get("/scholarships");

      return res.data.ScholarshipData;
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  const handleEditModal = async (Selectedscholarship) => {
    setSelectedScholarship(Selectedscholarship);
    reset({
      scholarshipName: Selectedscholarship.scholarshipName,
      universityName: Selectedscholarship.universityName,
      universityCountry: Selectedscholarship.universityCountry,
      universityCity: Selectedscholarship.universityCity,
      universityWorldRank: Selectedscholarship.universityWorldRank,
      scholarshipCategory: Selectedscholarship.scholarshipCategory,
      subjectCategory: Selectedscholarship.subjectCategory,
      degree: Selectedscholarship.degree,
      tuitionFees: Selectedscholarship.tuitionFees,
      applicationFees: Selectedscholarship.applicationFees,
      serviceCharge: Selectedscholarship.serviceCharge,
      applicationDeadline: Selectedscholarship.applicationDeadline
        ? new Date(Selectedscholarship.applicationDeadline)
            .toISOString()
            .split("T")[0]
        : "",
    });
    editScholarshipModalref.current.showModal();
  };
  const handleDelete = async () => {};
  const handleUpdateScholarship = (data) => {
    const sholarchipInfo = data;

    sholarchipInfo.serviceCharge = parseInt(sholarchipInfo.serviceCharge);
    sholarchipInfo.applicationFees = parseInt(sholarchipInfo.applicationFees);
    sholarchipInfo.tuitionFees = parseInt(sholarchipInfo.tuitionFees);
    sholarchipInfo.applicationDeadline=new Date(sholarchipInfo.applicationDeadline)
    console.log(sholarchipInfo)
  };
  return (
    <div>
      <h1 className="text-xl title font-medium">
        Total {allscholarships.length} scholarships found
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
            {allscholarships.map((scholarship, index) => (
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
                      onClick={() => handleEditModal(scholarship)}
                      className="btn btn-ghost tooltip tooltip-primary"
                      data-tip="Update"
                    >
                      <FaRegEdit></FaRegEdit>
                    </button>

                    <button
                      onClick={() => handleDelete(scholarship)}
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
      <dialog ref={editScholarshipModalref} className="modal">
        <div className="modal-box">
          <div>
            <div className="">
              <h2 className="text-2xl font-bold mb-6">Update Scholarship</h2>
              <form
                onSubmit={handleSubmit(handleUpdateScholarship)}
                className="space-y-6"
              >
                {/* Sclororship and univerisity name*/}
                <h3 className="text-xl font-semibold">Scholarship Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
                  <div>
                    {" "}
                    <label className="label">Scholarship Name</label>
                    <input
                      type="text"
                      placeholder="Scholarship Name"
                      className="input w-full"
                      defaultValue={selectedScholarship.scholarshipName}
                      {...register("scholarshipName")}
                    />
                    {errors?.scholarshipName?.type === "required" && (
                      <p className="text-red-400">Name Required</p>
                    )}
                  </div>
                  <div>
                    {" "}
                    <label className="label">
                      University Name <small>(Not Changeable)</small>
                    </label>
                    <input
                      defaultValue={selectedScholarship.universityName}
                      disabled={true}
                      type="text"
                      placeholder="University Name"
                      className="input w-full"
                    />
                    {errors?.universityName?.type === "required" && (
                      <p className="text-red-400">University</p>
                    )}
                  </div>
                </div>

                {/* image county and city name*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* image here */}
                  <div>
                    <label className="label">
                      University Image<small>(fixed)</small>
                    </label>
                    <input
                      disabled={true}
                      type="file"
                      className="file-input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      Country Name<small>(Not Changeable)</small>
                    </label>
                    <input
                      defaultValue={selectedScholarship.universityCountry}
                      disabled={true}
                      type="text"
                      placeholder="University Country"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      City Name<small>(Not Changeable)</small>
                    </label>
                    <input
                      defaultValue={selectedScholarship.universityCity}
                      disabled={true}
                      type="text"
                      placeholder="City Name"
                      className="input w-full"
                    />
                    {errors?.universityCity?.type === "required" && (
                      <p className="text-red-400">City Required</p>
                    )}
                  </div>
                  <div>
                    <label className="label">Rank</label>
                    <input
                      defaultValue={selectedScholarship.universityWorldRank}
                      type="number"
                      placeholder="World Rank"
                      className="input w-full"
                      {...register("universityWorldRank")}
                      min="1"
                    />
                    {errors?.universityWorldRank?.type === "required" && (
                      <p className="text-red-400">Rank Required</p>
                    )}
                  </div>
                </div>

                {/* subject and scholarship catagory */}
                <div className="grid grid-cols-2 md:grid-cols-2  gap-4">
                  <div>
                    {/* <label className="label">Subject Catagory</label>
                    <input
                      defaultValue={selectedScholarship.subjectCategory}
                      type="text"
                      placeholder="Subject Category"
                      className="input  w-full"
                      {...register("subjectCategory", { required: true })}
                    />{" "} */}
                    <fieldset className="fieldset">
                      <legend className="label">Subject Catagory</legend>
                      <select
                        defaultValue={selectedScholarship.subjectCategory}
                        // {...register("scholarshipCategory")}
                        className="select"
                      >
                        <option
                          defaultValue={selectedScholarship.subjectCategory}
                          disabled={true}
                        >
                          {selectedScholarship.subjectCategory}
                        </option>
                        <option>Engineering</option>
                        <option>Science</option>
                        <option>Humanities</option>
                        <option value={"Bussiness-studies"}>
                          Bussiness Studies
                        </option>
                      </select>
                      {/* <span className="label">Optional</span> */}
                    </fieldset>
                    {errors?.subjectCategory?.type === "required" && (
                      <p className="text-red-400">Required</p>
                    )}
                  </div>
                  {/* <div> */}
                  <fieldset className="fieldset">
                    <legend className="label">Scholarship Catagory</legend>
                    <select
                      defaultValue={selectedScholarship.scholarshipCategory}
                      //   {...register("subjectCategory")}
                      className="select"
                    >
                      <option
                        defaultValue={selectedScholarship.scholarshipCategory}
                        disabled={true}
                      >
                        {selectedScholarship.scholarshipCategory}
                      </option>
                      <option>Full fund</option>
                      <option>Partial</option>
                      <option>Self-fund</option>
                    </select>
                    {/* <span className="label">Optional</span> */}
                  </fieldset>
                  {errors?.scholarshipCategory?.type === "required" && (
                    <p className="text-red-400">Select a catagory</p>
                  )}
                  {/* </div> */}
                </div>

                {/* Scholarship degree and tuton application fees*/}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <fieldset className="fieldset">
                    <legend className="label">Degree</legend>
                    <select
                      defaultValue={selectedScholarship.degree}
                      {...register("degree")}
                      className="select"
                    >
                      <option defaultValue={selectedScholarship.degree}>
                        {selectedScholarship.degree}
                      </option>
                      <option>Diploma</option>
                      <option>Bachelor</option>
                      <option>Masters</option>
                    </select>
                    {/* <span className="label">Optional</span> */}
                  </fieldset>
                  {/* {errors?.degree?.type === "required" && (
                    <p className="text-red-400">Select Degree</p>
                  )} */}
                  <div>
                    <label className="label">Tuition fee</label>
                    <input
                      defaultValue={selectedScholarship.tuitionFees}
                      type="number"
                      placeholder="Tution fee"
                      className="input w-full"
                      {...register("tuitionFees")}
                    />
                  </div>
                  {/* Application fee */}
                  <div>
                    <label className="label">Applicataion Fee</label>
                    <input
                      defaultValue={selectedScholarship.applicationFees}
                      type="number"
                      placeholder="Application Fees"
                      className="input w-full"
                      min="0"
                      {...register("applicationFees")}
                    />
                    {/* {errors?.applicationFees?.type === "required" && (
                      <p className="text-red-400">Fee required</p>
                    )} */}
                  </div>
                  <div>
                    <label className="label">Service Charge</label>
                    <input
                      defaultValue={selectedScholarship.serviceCharge}
                      type="number"
                      placeholder="Service Charge"
                      className="input w-full"
                      min="0"
                      {...register("serviceCharge")}
                    />
                    {/* {errors?.serviceCharge?.type === "required" && (
                      <p className="text-red-400">Service Charge required</p>
                    )} */}
                  </div>
                  {/* Deadline date  */}
                  <div>
                    <label className="label">Deadline</label>
                    <input
                      defaultValue={
                        selectedScholarship.applicationDeadline
                          ? new Date(selectedScholarship.applicationDeadline)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      type="date"
                      className="input w-full"
                      {...register(
                        "applicationDeadline"
                        //     , {
                        //     required: true,
                        //     valueAsNumber: true,
                        //   }
                      )}
                    />
                    {/* {errors?.applicationDeadline?.type === "required" && (
                      <p className="text-red-400">Give a deadline</p>
                    )} */}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn bg-linear-to-l from-[#16E2F5] to-[#1E90FF] text-white w-full mt-4"
                >
                  Update Scholarship
                </button>
              </form>
            </div>
            {formLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <span className="loading text-4xl loading-ring loading-xl"></span>
              </div>
            )}
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

export default MangeScholarship;
