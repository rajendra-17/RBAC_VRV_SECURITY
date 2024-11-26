import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import { FaUsers } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { users, roles, permissions } from "../Api/MockDatas";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);
  const [totalPermissions, setTotalPermissions] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      setTotalUsers(users.length);
      setTotalRoles(roles.length);
      setTotalPermissions(permissions.length);
    };

    calculateTotals();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Navbar />
      <div className="bg-[#e7e7f0] rounded-lg shadow-md mt-6 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Overall Data</h2>
        <div className="py-5">
          <main className="h-full overflow-y-auto">
            <div className="container mx-auto grid">
              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {/* Total Users */}
                <Link
                  to="/users"
                  className="flex items-center p-4 rounded-lg shadow-xs dark:bg-[#001F3F] border hover:bg-orange-200 hover:text-black transition-all"
                >
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <FaUsers className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold hover:text-gray-700 dark:text-gray-300">
                      Total Users
                    </p>
                    <p className="text-xl font-semibold text-gray-200 hover:text-gray-600">
                      {totalUsers}
                    </p>
                  </div>
                </Link>

                {/* Total Roles */}
                <Link
                  to="/roles"
                  className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-[#001F3F] border border-white hover:bg-green-200 hover:text-black transition-all"
                >
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                    <MdSecurity className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold hover:text-gray-700 dark:text-gray-300">
                      Roles
                    </p>
                    <p className="text-xl font-semibold text-gray-200 hover:text-gray-600">
                      {totalRoles}
                    </p>
                  </div>
                </Link>

                {/* Total Permissions */}
                <Link
                  to="/permissions"
                  className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-[#001F3F] border border-white hover:bg-teal-200 hover:text-black transition-all"
                >
                  <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                    <FaKey className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold hover:text-gray-700 dark:text-gray-300">
                      Permissions
                    </p>
                    <p className="text-xl font-semibold text-gray-200 hover:text-gray-600">
                      {totalPermissions}
                    </p>
                  </div>
                </Link>

                {/* Active Users */}
                <Link
                  to="/users"
                  className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-[#001F3F] border border-white hover:bg-blue-200 hover:text-black transition-all"
                >
                  <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                    <IoMdPeople className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="mb-2 text-base font-semibold hover:text-gray-700 dark:text-gray-300">
                      Active Users
                    </p>
                    <p className="text-xl font-semibold text-gray-200 hover:text-gray-600">
                      {users.filter((user) => user.status === "Active").length}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
