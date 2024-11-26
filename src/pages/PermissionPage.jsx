import React from "react";
import Sidebar from "../components/Common/Sidebar";
import Permissions from "../components/Permissions/Permissions";

const PermissionPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-screen ml-0 sm:ml-64">
          <Permissions />
        </main>
      </div>
    </div>
  );
};

export default PermissionPage;
