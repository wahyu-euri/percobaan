import logo from "../../assets/image/banima.png";
import { useAuth } from "../../context/AuthProvider";

export default function Navbar() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex items-center justify-left gap-10 px-6 py-3">
        <img src={logo} alt="Logo" className="w-auto h-12" />

        <h1 className="text-xl font-bebas-neue tracking-wider font-semibold text-gray-800">
          KELOLA PENGGUNA
        </h1>

        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <p>{user?.name}</p>
            <p className="text-gray-600">Admin</p>
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
