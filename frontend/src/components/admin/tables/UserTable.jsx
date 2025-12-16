import { useState } from "react";
import { PencilLine, Trash2, Search } from "lucide-react";
import UserForm from "../forms/UserForm";

export default function UserTable({ users }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showData, setShowData] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // FILTER + LIMIT
  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => {
      if (status === "all") return true;
      return u.status === status;
    })
    .slice(0, showData);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-10 text-[#2b2b2b]">
        {/* CONTROL */}
        <div className="flex flex-wrap justify-between items-center mb-6 text-[#2b2b2b]">
          {/* Show data */}
          <div className="flex items-center gap-2">
            <span>Tampilkan</span>
            <select
              value={showData}
              onChange={(e) => setShowData(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[3, 5, 7, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>data</span>
          </div>

          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Cari pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md pl-9 pr-3 py-2 text-sm text-[#2b2b2b]"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-1 mr-[45rem]"
          >
            <option value="all">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>

          {/* Tambah */}
          <button
            onClick={() => {
              setSelectedUser(null);
              setShowForm(true);
            }}
            className="px-3 py-2 rounded-lg bg-[#ebf9f1] border border-[#1b7a4a] text-sm hover:bg-green-100"
          >
            + Tambah
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-[#2b2b2b]">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-3 text-center">No</th>
                <th className="p-3">Foto</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, index) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={
                          u.foto
                            ? `http://127.0.0.1:8000/storage/${u.foto}`
                            : "/default-avatar.png"
                        }
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium
                          ${
                            u.status === "aktif"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="flex flex-row justify-center items-center p-5 gap-3">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setShowForm(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <PencilLine size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-4 text-[#2b2b2b]">
            <UserForm
              initialData={selectedUser}
              onSubmit={(data) => {
                selectedUser
                  ? console.log("EDIT", data)
                  : console.log("TAMBAH", data);
                setShowForm(false);
              }}
            />

            <button
              onClick={() => setShowForm(false)}
              className="w-full mt-2 text-sm text-[#2b2b2b] opacity-70 hover:opacity-100"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
