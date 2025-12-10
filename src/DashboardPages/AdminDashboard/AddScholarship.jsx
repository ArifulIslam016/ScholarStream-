import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthhooks from "../../hooks/Authhooks";
import axios from "axios";
import useSecureInstance from "../../hooks/SecureInstance";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const [formLoading, setformLoading] = useState(false);
  const { user } = useAuthhooks();
  const Instance = useSecureInstance();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleAddScholarship = (data) => {
    setformLoading(true);
    const sholarchipInfo = data;
      sholarchipInfo.serviceCharge=parseInt(sholarchipInfo.serviceCharge)
      sholarchipInfo.applicationFees=parseInt(sholarchipInfo.applicationFees)
      sholarchipInfo.tuitionFees=parseInt(sholarchipInfo.tuitionFees)
    sholarchipInfo.postedUserEmail = user.email;
    const universityFormData = new FormData();
    console.log(data.photo);
    universityFormData.append("image", data.photo[0]);
    //  console.log(sholarchipInfo)
    delete sholarchipInfo.photo;

    const imagebbHostApi = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_host_key
    }`;
    axios
      .post(imagebbHostApi, universityFormData)
      .then((universityImagedata) => {
        console.log(universityImagedata);
        sholarchipInfo.universityImage = universityImagedata.data.data.url;
        console.log(sholarchipInfo);
        Instance.post("/scholarships", sholarchipInfo)
          .then((res) => {
            setformLoading(false);
            console.log(res);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Scholarship addes succesfully",
                showClass: {
                  popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
                },
                hideClass: {
                  popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
                },
              });
              reset();
            }
          })
          .catch(() => {
            setformLoading(false);

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      });
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Scholarship</h2>
        <form
          onSubmit={handleSubmit(handleAddScholarship)}
          className="space-y-6"
        >
          {/* Sclororship and univerisity name*/}
          <h3 className="text-xl font-semibold">Scholarship Info</h3>
          <div className="grid grid-cols-2 w-full  gap-4">
            <div>
              {" "}
              <label className="label">Scholarship Name</label>
              <input
                type="text"
                placeholder="Scholarship Name"
                className="input w-full"
                {...register("scholarshipName", { required: true })}
              />
              {errors?.scholarshipName?.type === "required" && (
                <p className="text-red-400">Name Required</p>
              )}
            </div>
            <div>
              {" "}
              <label className="label">University Name</label>
              <input
                type="text"
                placeholder="University Name"
                className="input w-full"
                {...register("universityName", { required: true })}
              />
              {errors?.universityName?.type === "required" && (
                <p className="text-red-400">University</p>
              )}
            </div>
          </div>

          {/* image county and city name*/}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {/* image here */}
            <div>
              <label className="label">University Image</label>
              <input
                {...register("photo", { required: true })}
                type="file"
                className="file-input w-full"
              />
              {errors?.photo?.type === "required" && (
                <p className="text-red-400">Photo Required</p>
              )}
            </div>
            <div>
              <label className="label">Country Name</label>
              <input
                type="text"
                placeholder="University Country"
                className="input w-full"
                {...register("universityCountry", { required: true })}
              />
              {errors?.universityCountry?.type === "required" && (
                <p className="text-red-400">Country Required</p>
              )}
            </div>
            <div>
              <label className="label">City Name</label>
              <input
                type="text"
                placeholder="City Name"
                className="input w-full"
                {...register("universityCity", { required: true })}
              />
              {errors?.universityCity?.type === "required" && (
                <p className="text-red-400">City Required</p>
              )}
            </div>
            <div>
              <label className="label">Rank</label>
              <input
                type="number"
                placeholder="World Rank"
                className="input w-full"
                {...register("universityWorldRank", { required: true })}
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
                type="text"
                placeholder="Subject Category"
                className="input  w-full"
                {...register("subjectCategory", { required: true })}
              /> */}     <fieldset className="fieldset">
              <legend className="label">Subject Catagory</legend>
              <select
                defaultValue=""
                {...register("scholarshipCategory", { required: true })}
                className="select"
              >
                <option value="" disabled={true}>
                  Select a subject Catagory
                </option>
                <option>Engineering</option>
                <option>Science</option>
                <option>Humanities</option>
                <option value={'Bussiness-studies'}>Bussiness Studies</option>
              </select>
              <span className="label">Optional</span>
            </fieldset>
              {errors?.subjectCategory?.type === "required" && (
                <p className="text-red-400">Required</p>
              )}
            </div>
            {/* <div> */}
            <fieldset className="fieldset">
              <legend className="label">Scholarship Catagory</legend>
              <select
                defaultValue=""
                {...register("scholarshipCategory", { required: true })}
                className="select"
              >
                <option value="" disabled={true}>
                  Select a Scholarship Catagory
                </option>
                <option>Full fund</option>
                <option>Partial</option>
                <option>Self-fund</option>
              </select>
              <span className="label">Optional</span>
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
                defaultValue=""
                {...register("degree ", { required: true })}
                className="select"
              >
                <option value="" disabled={true}>
                  Select a Degree
                </option>
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
              <span className="label">Optional</span>
            </fieldset>
            {errors?.degree?.type === "required" && (
              <p className="text-red-400">Select Degree</p>
            )}
            <div>
              <label className="label">Tuition fee</label>
              <input
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
                type="number"
                placeholder="Application Fees"
                className="input w-full"
                min="0"
                {...register("applicationFees", { required: true })}
              />
              {errors?.applicationFees?.type === "required" && (
                <p className="text-red-400">Fee required</p>
              )}
            </div>
            <div>
              <label className="label">Service Charge</label>
              <input
                type="number"
                placeholder="Service Charge"
                className="input w-full"
                min="0"
                {...register("serviceCharge", { required: true })}
              />
              {errors?.serviceCharge?.type === "required" && (
                <p className="text-red-400">Service Charge required</p>
              )}
            </div>
            {/* Deadline date  */}
            <div>
              <label className="label">Deadline</label>
              <input
                type="date"
                className="input w-full"
                {...register("applicationDeadline", { required: true, valueAsNumber:true })}
              />
              {errors?.applicationDeadline?.type === "required" && (
                <p className="text-red-400">Give a deadline</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-gradient-to-l from-[#16E2F5] to-[#1E90FF] w-full mt-4"
          >
            Add Scholarship
          </button>
        </form>
      </div>
      {formLoading&&  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
     <span className="loading text-4xl loading-ring loading-xl"></span>
    </div>}
    </div>
  );
};

export default AddScholarship;
