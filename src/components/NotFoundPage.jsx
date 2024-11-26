import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-lg text-gray-600 mb-6">
          We couldn't find the page you're looking for. It might have been moved
          or deleted.
        </p>

        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-block bg-blue-800 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Go back to Dashboard
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          If you want to wait, we'll automatically redirect you to the dashboard
          in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
