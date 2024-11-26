import React, { useState, useEffect } from "react";
import Navbar from "../Common/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AddUserModal from "../Modal/AddModal/AddUserModal";
import EditUserModal from "../Modal/EditModal/EditUserModal";
import { users as importedUsers } from "../Api/MockDatas";
import { roles as importedRoles } from "../Api/MockDatas";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const User = () => {
  const headings = [
    { key: "userId", value: "User ID" },
    { key: "image", value: "Image" },
    { key: "name", value: "Username" },
    { key: "email", value: "Email" },
    { key: "role", value: "Role" },
    { key: "status", value: "Status" },
    { key: "created", value: "Created" },
    { key: "action", value: "Actions" },
  ];

  const [users, setUsers] = useState(importedUsers);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("user");
  const [filter, setFilter] = useState({ role: "", status: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "userId",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredUsers = users.filter((user) => {
    const name = user.name ? user.name.toLowerCase() : "";
    const role = user.role ? user.role.toLowerCase() : "";
    const status = user.status ? user.status.toLowerCase() : "";
    const created = user.created ? user.created.toLowerCase() : "";

    if (searchCategory === "user") {
      return (
        name.includes(debouncedSearchTerm.toLowerCase()) ||
        role.includes(debouncedSearchTerm.toLowerCase()) ||
        status.includes(debouncedSearchTerm.toLowerCase()) ||
        created.includes(debouncedSearchTerm.toLowerCase())
      );
    } else {
      const searchValue = user[searchCategory]
        ? user[searchCategory].toLowerCase()
        : "";
      return searchValue.includes(debouncedSearchTerm.toLowerCase());
    }
  });

  const filteredByRoleAndStatus = filteredUsers.filter((user) => {
    return (
      (filter.role ? user.role === filter.role : true) &&
      (filter.status ? user.status === filter.status : true)
    );
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = filteredByRoleAndStatus.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getRowDetail = (event, id) => {
    const rows = [...selectedRows];
    if (rows.includes(id)) {
      setSelectedRows(rows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...rows, id]);
    }
  };

  const selectAllCheckbox = (event) => {
    const newSelectedRows = [];
    if (event.target.checked) {
      users.forEach((user) => {
        newSelectedRows.push(user.userId);
      });
    }
    setSelectedRows(newSelectedRows);
  };

  const handleEdit = (userId) => {
    const user = users.find((user) => user.userId === userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete user with ID ${userId}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.userId !== userId));
        toast(`User with ID ${userId} deleted successfully`, {
          position: "top-right",
        });
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.error("No users selected for deletion", { position: "top-right" });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedRows.length} user(s). This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete them!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => !selectedRows.includes(user.userId)));
        toast(`${selectedRows.length} user(s) deleted successfully`, {
          position: "top-right",
        });
        setSelectedRows([]);
      }
    });
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUser) => [...prevUser, { id: Date.now(), ...newUser }]);
    toast("User added successfully", { position: "top-right" });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Navbar />
      <ToastContainer />
      <div className="bg-[#e7e7f0] rounded-lg shadow-md mt-6 p-6 sm:p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">User Table</h1>
          <div className="mb-4 flex flex-col sm:flex-row xl:flex-row lg:flex-row md:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto items-start sm:items-center">
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  className="p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out w-full"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition duration-200 ease-in-out" />
              </div>

              <select
                className="p-2 border rounded-lg w-full sm:w-40 mt-2 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
                value={filter.role}
                onChange={(e) => setFilter({ ...filter, role: e.target.value })}
              >
                <option value="" className="text-gray-600">
                  Filter by Role
                </option>
                {importedRoles.map((role, index) => (
                  <option
                    key={index}
                    value={role.rolename}
                    className="text-gray-600"
                  >
                    {role.rolename}
                  </option>
                ))}
              </select> 

              <select
                className="p-2 border rounded-lg w-full sm:w-40 mt-2 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
                value={filter.status}
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
              >
                <option value="" className="text-gray-600">
                  Filter by Status
                </option>
                <option value="Active" className="text-gray-600">
                  Active
                </option>
                <option value="Inactive" className="text-gray-600">
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex justify-center pt-2 md:pt-0 sm:pt-0 items-center gap-3">
              <AddUserModal onAddUser={handleAddUser} />
              <button
                className="flex items-center gap-2 bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition-colors duration-300"
                onClick={handleBulkDelete}
              >
                <FaTrash className="" />
                Delete Selected
              </button>
            </div>
          </div>

          <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="table-auto w-full text-left text-sm text-gray-900">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr className="">
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      className="rowCheckbox"
                      onChange={selectAllCheckbox}
                    />
                  </th>
                  {headings.map((heading) => (
                    <th
                      key={heading.key}
                      className="px-6 py-3 font-semibold text-gray-700 cursor-pointer"
                      onClick={() => handleSort(heading.key)}
                    >
                      {heading.value}
                      {sortConfig.key === heading.key &&
                        (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={`${user.userId}-${user.name}`}
                    className="hover:bg-gray-50 border-b border-gray-300"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rowCheckbox"
                        checked={selectedRows.includes(user.userId)}
                        onChange={(e) => getRowDetail(e, user.userId)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={
                          user.image ||
                          "https://image.pngaaa.com/730/4806730-middle.png"
                        }
                        alt={`${user.name}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`border flex justify-center p-2 rounded-lg ${
                          user.status === "Active"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {user.status}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(user.created).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-5">
                      <button
                        className="text-[#001F3F] hover:text-blue-800 transition-colors duration-300"
                        onClick={() => handleEdit(user.userId)}
                      >
                        <FaEdit size={23} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                        onClick={() => handleDelete(user.userId)}
                      >
                        <FaTrash size={23} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <EditUserModal
              userData={selectedUser}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={(updatedUser) => {
                setUsers(
                  users.map((user) =>
                    user.userId === updatedUser.userId ? updatedUser : user
                  )
                );
                setIsModalOpen(false);
              }}
            />
          )}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-lg ${
                    i + 1 === currentPage
                      ? "bg-[#001F3F] text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-700 hover:text-white transition-colors duration-300`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
