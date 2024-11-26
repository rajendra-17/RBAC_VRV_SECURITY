import React, { useState } from "react";
import { FaUsers, FaKey } from "react-icons/fa";
import { MdSecurity, MdDashboard } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
  { label: "Users", icon: <FaUsers />, path: "/users" },
  { label: "Roles", icon: <MdSecurity />, path: "/roles" },
  { label: "Permissions", icon: <FaKey />, path: "/permissions" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#001F3F] text-white z-40 sm:w-64 w-60 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="w-full flex justify-center py-7 mb-8 border-b border-gray-700">
          <Link
            to={"/dashboard"}
            className="text-2xl font-bold text-white tracking-wide cursor-pointer"
          >
            RBAC
          </Link>
        </div>
        <ul className="flex flex-col gap-4 w-full px-4">
          {menuItems.map((menu, index) => (
            <li key={index} className="w-full">
              <Link
                to={menu.path}
                className={`flex items-center gap-4 w-full h-12 px-4 rounded-md text-left text-white/90 hover:bg-gray-800 transition-all ${
                  location.pathname === menu.path ? "bg-gray-700" : ""
                }`}
              >
                <span className="text-2xl">{menu.icon}</span>
                <span className="flex-1 text-lg">{menu.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <button
        onClick={toggleSidebar}
        className="absolute top-7 left-4 sm:hidden z-50 p-2 rounded-full text-white"
      >
        {isSidebarOpen ? (
          <AiOutlineCloseCircle
            size={24}
            className="p-1 bg-white text-gray-900 rounded-full"
          />
        ) : (
          <CgMenuGridO
            size={24}
            className="bg-white text-gray-900 rounded-full"
          />
        )}
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
