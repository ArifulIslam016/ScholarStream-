import React from "react";
import useAuthhooks from "../hooks/Authhooks";

const Myprofile = () => {
  const { user } = useAuthhooks();
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-white/70 shadow-md rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center gap-6">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.displayName}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <h1 className="my-6 h-px bg-gray-200"></h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Full Name</span>
            <span className="text-gray-900">{user?.displayName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
