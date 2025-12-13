import {
  LayoutDashboard,
  FolderKanban,
  Package,
  Handshake,
  Users,
  Info,
  Building,
  Image,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      label: "Dasbor",
      icon: <LayoutDashboard size={18} />,
      path: "/admin/dashboard",
    },
    {
      id: 2,
      label: "Proyek",
      icon: <FolderKanban size={18} />,
      path: "/admin/proyek",
    },
    {
      id: 3,
      label: "Katalog Produk",
      icon: <Package size={18} />,
      path: "/admin/katalog",
    },
    {
      id: 4,
      label: "Layanan",
      icon: <Handshake size={18} />,
      path: "/admin/layanan",
    },
    { id: 5, label: "Klien", icon: <Users size={18} />, path: "/admin/klien" },
    {
      id: 6,
      label: "Pengguna",
      icon: <Users size={18} />,
      path: "/admin/pengguna",
    },
    {
      id: 7,
      label: "Info kontak",
      icon: <Info size={18} />,
      path: "/admin/info-kontak",
    },
    {
      id: 8,
      label: "Profil Perusahaan",
      icon: <Building size={18} />,
      path: "/admin/profil",
    },
    { id: 9, label: "Aset", icon: <Image size={18} />, path: "/admin/aset" },
    {
      id: 10,
      label: "Informasi Terkini",
      icon: <Bell size={18} />,
      path: "/admin/informasi",
    },
    { id: 11, label: "Keluar", icon: <LogOut size={18} />, path: "/logout" },
  ];

  const menuUtama = menuItems.filter((item) => item.id !== 11);
  const keluar = menuItems.find((item) => item.id === 11);

  return (
    <aside
      className={`
        flex flex-col h-full bg-white border-r shadow-lg p-4 overflow-hidden
        transition-all duration-200
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-fix flex justify-center mb-4 bg-white p-2 border-2 border-[#2b2b2b] rounded-lg hover:bg-gray-200 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="text-[#2b2b2b]" />
        ) : (
          <>
            <span className="text-[#2b2b2b] text-sm">Tutup Sidebar</span>
            <ChevronLeft className="text-[#2b2b2b]" />
          </>
        )}
      </button>

      <ul className="space-y-2">
        {menuUtama.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.id}>
              <a
                href={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded transition-all duration-150
                  border
                  ${
                    isActive
                      ? "bg-white shadow-md border-[#2b2b2b] border-2 -translate-y-[1px]"
                      : "border-transparent hover:bg-white hover:shadow-md hover:border-gray-200 hover:-translate-y-[1px]"
                  }
                `}
              >
                <span className="text-[#2b2b2b]">{item.icon}</span>

                {!isCollapsed && (
                  <span className="text-[#2b2b2b]">{item.label}</span>
                )}
              </a>
            </li>
          );
        })}

        <li className="flex flex-col items-center w-full mt-[100%]">
          <a
            href={keluar.path}
            className="flex justify-center items-center gap-3 px-3 py-2 w-full border-2 border-[#2b2b2b] rounded-lg hover:bg-gray-200 hover:border-red-600 transition-all"
          >
            {!isCollapsed && (
              <span className="text-[#2b2b2b] flex justify-center items-center">
                {keluar.label}
              </span>
            )}
            <span className="text-[#2b2b2b] flex justify-center items-center">
              {keluar.icon}
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
