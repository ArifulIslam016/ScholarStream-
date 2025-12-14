import React from "react";
import { Link, Outlet } from "react-router";
import useAuthhooks from "../hooks/Authhooks";
import useUserRoleHooks from "../hooks/UserRoleHooks";
import logoImg from "../assets/SchorarStream Logo.png";
import { IoIosSchool } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LiaListSolid } from "react-icons/lia";
const DashboardLayout = () => {
  const { user } = useAuthhooks();
  const { role } = useUserRoleHooks();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open md:w-11/12 mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-primary text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-white font-extrabold text-4xl">
            {role === "modaretor" ? (
              <h1>Modaretor Dashboard</h1>
            ) : role === "admin" ? (
              <h1>Admin Dashboard</h1>
            ) : (
              <h1>Student Dashboard</h1>
            )}
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li
              className="max-w-20 is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
              data-tip="Home"
            >
              <Link to={"/"}>
                <img src={logoImg} alt="" />
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard"}
                className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </Link>
            </li>
            <li
              className="max-w-20 is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
              data-tip="Home"
            >
              <Link to={"/dashboard/my-profile"} data-tip="My Profile">
                <span className="text-xl">
                  {" "}
                  <CgProfile />
                </span>
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>
            <li
             
            
            >
              <Link to={"/dashboard/myapplications"}
               className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
              data-tip="My Applications">
                <span className="text-xl">
                  {" "}
                  <LiaListSolid />
                </span>
                <span className="is-drawer-close:hidden">My Apllications </span>
              </Link>
            </li>
            {/* Admin only route */}
            {role === "admin" && (
              <li>
                <Link
                  to={"/dashboard/addScholarship"}
                  className="is-drawer-close:tooltip tooltip-primary is-drawer-close:tooltip-right"
                  data-tip="Add Scholorship"
                >
                  <span className="text-xl">
                    <IoIosSchool />
                  </span>

                  <span className="is-drawer-close:hidden">
                    Add Scholarship
                  </span>
                </Link>
              </li>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
