import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const EditUserModal = ({ userData, isOpen, onClose, onSave }) => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave(user);
    } else {
      console.error("onSave is not a function!", onSave);
    }
    toast("Successfully edited");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <motion.div
              className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-medium text-gray-800">Edit User</h1>
                <button
                  onClick={onClose}
                  className="text-gray-600 rounded-full outline hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-700 capitalize"
                  >
                    Username
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={user.name || ""}
                    onChange={handleInputChange}
                    placeholder="Edit username..."
                    type="text"
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="role"
                    className="block text-sm text-gray-700 capitalize"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={user.role || ""}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  >
                    <option value="">Select role...</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="status"
                    className="block text-sm text-gray-700 capitalize"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={user.status || ""}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  >
                    <option value="">Select status...</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-[#001F3F] rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUserModal;
