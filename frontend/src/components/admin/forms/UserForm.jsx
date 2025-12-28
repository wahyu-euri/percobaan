import { useState } from "react";
import { X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserForm({ onClose, initialData, onSubmit }) {
  const [form, setForm] = useState(() => ({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    status: initialData?.status || "aktif",
    foto: null,
  }));

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const toggleStatus = () => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === "aktif" ? "tidak_aktif" : "aktif",
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    onClose();
    navigate("/admin/pengguna");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] p-10 rounded-xl text-[#2b2b2b] relative">
        <form onSubmit={submit} className="text-[#2b2b2b] space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {initialData ? "Edit Data Klien" : "Tambah Data Klien"}
            </h2>
            <button
              onClick={handleCancel}
              className="rounded-3xl border-3 border-red-500 p-1"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div>
                <label className="block font-medium mb-1">Nama Pengguna</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-full px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-full px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder={initialData ? "Kosongkan jika tidak diubah" : ""}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-full px-4 py-2"
                />
              </div>

              {/* TOGGLE STATUS */}
              <div>
                <label className="block font-medium mb-2">Status</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleStatus}
                    className={`w-14 h-7 rounded-full relative ${
                      form.status === "aktif" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${
                        form.status === "tidak_aktif" ? "translate-x-7" : ""
                      }`}
                    />
                  </button>
                  <span>
                    {form.status === "aktif" ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <label className="block font-medium mb-1">Profil</label>
                <input type="file" name="foto" onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-green-600 text-white rounded-full">
              <Save />
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
