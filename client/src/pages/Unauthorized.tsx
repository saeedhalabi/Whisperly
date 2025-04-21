import React from "react";
import { Link } from "react-router";

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">
        401 - Unauthorized
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You are not authorized to access this page.
      </p>
      <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-800 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
