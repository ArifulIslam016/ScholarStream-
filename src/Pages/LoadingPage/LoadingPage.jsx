import React from "react";

const LoadingPage = () => {
  return (
    <div className="text-center min-h-screen flex justify-center items-center text-blue-400 font-extrabold">
      <h1 className="text-4xl">
        L<span className="loading loading-spinner loading-xs"></span>
        ading
      </h1>
    </div>
  );
};

export default LoadingPage;
