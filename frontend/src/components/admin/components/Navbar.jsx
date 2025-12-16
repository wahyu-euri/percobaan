import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import logo from "../../../assets/image/banima.png";

const pageTitles = {
  "/admin/dasbor": "Dasbor Admin",
  "/admin/pengguna": "Kelola Pengguna",
  "/admin/portofolio": "Kelola Portofolio",
  "/admin/katalog": "Kelola Katalog Produk",
  "/admin/layanan": "Kelola Layanan",
  "/admin/klien": "Kelola Klien",
  "/admin/profil": "Profil Perusahaan",
  "/admin/info-kontak": "Kelola Info Kontak",
  "/admin/informasi": "Kelola Informasi Terkini",
  "/admin/aset": "Kelola Aset",
};

export default function Navbar() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo + Judul */}
        <div className="flex items-center gap-4">
          <img src={logo} className="h-12" />
          <h1 className="text-xl ml-8 font-bebas-neue tracking-wider font-semibold text-[#2b2b2b]">
            {title}
          </h1>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <p className="text-[#2b2b2b] text-lg font-semibold">
              {user?.name ?? "-"}
            </p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
          <img
            src={
              user?.foto
                ? `http://127.0.0.1:8000/storage/${user.foto}`
                : "/default-avatar.png"
            }
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
