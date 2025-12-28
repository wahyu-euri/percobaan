import { Search, PencilLine, Trash2 } from "lucide-react";

export default function UserTable({
  users,
  page,
  lastPage,
  perPage,
  loading,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onPageChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  const pagesToShow = 5;
  let start = Math.max(1, page - Math.floor(pagesToShow / 2));
  let end = start + pagesToShow - 1;

  if (end > lastPage) {
    end = lastPage;
    start = Math.max(1, end - pagesToShow + 1);
  }

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-sm text-[#2b2b2b]">

      {/* CONTROLS */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          {/* per page */}
          <span>Tampilka</span>
          <select
            value={perPage}
            onChange={(e) => onPageChange(1, Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          <span className="mr-5">Data</span>

          {/* search */}
          <div className="relative">
            <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari pengguna..."
              className="pl-8 border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* status filter */}
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="tidak_aktif">Tidak Aktif</option>
          </select>
        </div>

        <button
          onClick={onAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Tambah
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-1">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="py-2 px-3 text-left">No</th>
              <th className="py-2 px-3 text-left">Profil</th>
              <th className="py-2 px-3 text-left">Nama pengguna</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr
                  key={u.id}
                  className="bg-white hover:bg-gray-50 border-b"
                >
                  <td className="py-3 px-3">
                    {(page - 1) * perPage + i + 1}.
                  </td>

                  <td className="py-2 px-3">
                    <img
                      src={
                        u.foto
                          ? `http://127.0.0.1:8000/storage/${u.foto}`
                          : "/default-avatar.png"
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>

                  <td className="py-3 px-3 font-medium">{u.name}</td>
                  <td className="py-3 px-3">{u.email}</td>

                  <td className="py-3 px-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        u.status === "aktif"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {u.status === "aktif" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center flex justify-center gap-3">
                    <button onClick={() => onEdit(u)}>
                      <PencilLine className="w-5 h-5 text-blue-500" />
                    </button>
                    <button onClick={() => onDelete(u)}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (5 angka) */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => onPageChange(page - 1, perPage)}
          disabled={page === 1}
          className="px-3 py-1 rounded text-sm border disabled:opacity-50"
        >
          Sebelumya
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p, perPage)}
            className={`px-3 py-1 rounded-full text-sm border ${
              p === page
                ? "bg-indigo-600 text-white border-indigo-600"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1, perPage)}
          disabled={page === lastPage}
          className="px-3 py-1 rounded text-sm border disabled:opacity-50"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
