import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-[#f7f8fb]">
      {/* Navbar */}
      <div className="relative z-20 shadow-lg">
        <Navbar />
      </div>

      {/* Wrapper Sidebar + Konten */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar wrapper (shadow ke luar) */}
        <div className="relative z-10 shadow-[4px_0_12px_rgba(0,0,0,0.15)]">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
