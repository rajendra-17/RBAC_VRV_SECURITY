import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const EditRoleModal = ({ roleData, isOpen, onClose, onSave }) => {
  const [role, setRole] = useState({
    id: "",
    rolename: "",
    description: "",
    permissions: {},
  });

  useEffect(() => {
    if (roleData) {
      setRole(roleData);
    }
  }, [roleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permissionName) => {
    setRole((prevRole) => ({
      ...prevRole,
      permissions: {
        ...prevRole.permissions,
        [permissionName]: !prevRole.permissions[permissionName],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave(role);
    } else {
      console.error("onSave is not a function!", onSave);
    }
    onClose();
    toast("Role successfully edited!");
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
                <h1 className="text-xl font-medium text-gray-800">Edit Role</h1>
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
                    htmlFor="rolename"
                    className="block text-sm text-gray-700 capitalize"
                  >
                    Role
                  </label>
                  <input
                    id="rolename"
                    name="rolename"
                    value={role.rolename || ""}
                    onChange={handleInputChange}
                    placeholder="Edit role name..."
                    type="text"
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block text-sm text-gray-700 capitalize"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={role.description || ""}
                    onChange={handleInputChange}
                    placeholder="Edit role description..."
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                    rows="3"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-gray-700 capitalize">
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {role.permissions &&
                      Object.entries(role.permissions).map(
                        ([permissionName, isActive]) => (
                          <div
                            key={permissionName}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() =>
                                handlePermissionChange(permissionName)
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className="text-sm">
                              {permissionName.replace(/([A-Z])/g, " $1")}
                            </label>
                          </div>
                        )
                      )}
                  </div>
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

export default EditRoleModal;
