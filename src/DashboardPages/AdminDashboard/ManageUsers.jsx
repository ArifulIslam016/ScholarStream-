import React, { useState } from "react";
import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import { CiFilter } from "react-icons/ci";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const Instance = useSecureInstance();
  const [filterkey, setfilterKey] = useState("");
  const { data: allUsers = [], refetch: userRefetch } = useQuery({
    queryKey: ["allUsers", filterkey],
    queryFn: async () => {
      const res = await Instance.get(`/allUsers?filterkey=${filterkey}`);
      return res.data;
    },
  });

  const handleChangeRole = async (id, role) => {
    try {
      const res = await Instance.patch(`/users/${id}/edit`, { role: role });
      if (res.data.modifiedCount) {
        userRefetch();
        Swal.fire({
          icon: "success",
          title: `user Update to ${role}`,
          draggable: true,
        });
      }
    } catch (err) {
      if (err) {
        Swal.fire({
          icon: "warning",
          title: `Oops...${err.code}`,
          text: "Something went wrong!",
        });
      }
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete",
      }).then(async(result) => {
        if (result.isConfirmed) {
            const res = await Instance.delete(`/users/${id}`);
            // console.log(res)
         if(res.deletedCount){
            userRefetch()
             Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
         }
        }
      });
    } catch (err) {
      if (err) {
        Swal.fire({
          icon: "warning",
          title: `Oops...${err.code}`,
          text: "Something went wrong!",
        });
      }
    }
  };
  const handleFilterByRole = (role) => {
    setfilterKey(role);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm md:text-xl title md:font-medium">
          Total {allUsers.length} application found
        </h1>
        <div className="dropdown dropdown-center">
          <button tabIndex={20} role="button" className="btn py-1 btn-outline">
            Filter by <CiFilter />
          </button>
          <ul
            tabIndex="-1"
            className="dropdown-content  menu bg-base-100 rounded-box z-999 w-52 p-2 space-y-2 shadow-sm"
          >
            <li>
              <button onClick={() => handleFilterByRole("")} className="btn">
                All Users
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterByRole("student")}
                className="btn"
              >
                Student
              </button>
            </li>

            <li>
              <button
                onClick={() => handleFilterByRole("moderator")}
                className="btn "
              >
                Modarator
              </button>
            </li>

            <li>
              <button
                onClick={() => handleFilterByRole("admin")}
                className="btn"
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={`${user.photoURL}`}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td className="flex gap-2">
                    <div className="dropdown dropdown-center">
                      <button
                        tabIndex={20}
                        role="button"
                        className="btn py-1 btn-primary"
                      >
                        Update
                      </button>
                      <ul
                        tabIndex="-1"
                        className="dropdown-content  menu bg-base-100 rounded-box z-999 w-52 p-2 space-y-2 shadow-sm"
                      >
                        {user.role !== "student" && (
                          <li>
                            <button
                              onClick={() =>
                                handleChangeRole(user._id, "student")
                              }
                              className="btn bg-red-300"
                            >
                              Student
                            </button>
                          </li>
                        )}
                        {user.role !== "moderator" && (
                          <li>
                            <button
                              onClick={() =>
                                handleChangeRole(user._id, "moderator")
                              }
                              className="btn bg-yellow-300 "
                            >
                              Modarator
                            </button>
                          </li>
                        )}
                        {user.role !== "admin" && (
                          <li>
                            <button
                              onClick={() =>
                                handleChangeRole(user._id, "admin")
                              }
                              className="btn bg-green-300"
                            >
                              Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                    <button
                    onClick={()=>handleDeleteUser(user._id)}
                    
                    className="btn btn-outline text-red-500">
                        Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
