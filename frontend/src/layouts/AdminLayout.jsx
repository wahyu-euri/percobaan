import React from "react";
import Sidebar from "../components/admin/components/Sidebar";
import Navbar from "../components/admin/components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-[#f7f8fb]">
      <div className="relative z-20 shadow-lg">
        <Navbar />
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="relative z-10 shadow-[4px_0_12px_rgba(0,0,0,0.15)]">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
