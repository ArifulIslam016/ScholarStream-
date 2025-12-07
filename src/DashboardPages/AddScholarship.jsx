import React from "react";

const AddScholarship = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Scholarship</h2>
        <form className="space-y-6">
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
                required
              />
            </div>
            <div>
              {" "}
              <label className="label">University Name</label>
              <input
                type="text"
                placeholder="University Name"
                className="input w-full"
                required
              />
            </div>
          </div>

          {/* image county and city name*/}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label className="label">University Image</label>
              <input type="file" className="file-input w-full" />
            </div>
            <div>
              <label className="label">Country Name</label>
              <input
                type="text"
                placeholder="University Name"
                className="input w-full"
                required
              />
            </div>
            <div>
              <label className="label">City Name</label>
              <input
                type="text"
                placeholder="University Name"
                className="input w-full"
                required
              />
            </div>
            <div>
              <label className="label">Rank</label>
              <input
                type="number"
                placeholder="World Rank"
                className="input w-full"
                min="1"
              />
            </div>
          </div>

          {/* subject and scholarship catagory */}
          <div className="grid grid-cols-2 md:grid-cols-2  gap-4">
            <div>
              <label className="label">Subject Catagory</label>
              <input
                type="text"
                placeholder="Subject Category"
                className="input  w-full"
              />
            </div>
            <div>
              <label className="label">ScholarshipCatagory</label>

              <input
                type="text"
                placeholder="Scholarship Category"
                className="input  w-full"
              />
            </div>
          </div>

          {/* Scholarship degree and tuton application fees*/}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Scholarship Degree</label>
              <input
                type="text"
                placeholder="Degree"
                className="input  w-full"
              />
            </div>
            <div>
              <label className="label">Tuition fee</label>
              <input type="number" placeholder="Tution fee" className="input w-full" />
            </div>
            {/* Application fee */}
            <div>
              <label className="label">Applicataion Fee</label>
              <input
                type="number"
                placeholder="Application Fees"
                className="input w-full"
                min="0"
                required
              />
            </div>
            <div>
              <label className="label">Service Charge</label>
              <input
                type="number"
                placeholder="Service Charge"
                className="input w-full"
                min="0"
                required
              />
            </div>
            {/* Deadline date  */}
            <div>
              <label className="label">Deadline</label>
              <input type="date" className="input w-full" required />
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
    </div>
  );
};

export default AddScholarship;
