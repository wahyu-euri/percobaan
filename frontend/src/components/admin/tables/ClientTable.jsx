import { PencilLine, Trash2 } from "lucide-react";
import api from "../../../api/api";
import { useState } from "react";

export default function ClientTable({ clients, onEdit, onDelete, refresh }) {
  const [show, setShow] = useState(5);

  const toggleStatus = async (id) => {
    await api.patch(`/admin/klien/${id}/toggle`);
    refresh();
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm">Tampilkan</span>
          <select
            value={show}
            onChange={(e) => setShow(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 25].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <span className="text-sm">data</span>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-center">Foto</th>
            <th className="p-3 text-left">Nama Klien</th>
            <th className="p-3 text-left">Website</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {clients.slice(0, show).map((c) => (
            <tr
              key={c.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3 text-center">
                {c.foto ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${c.foto}`}
                    className="h-10 mx-auto object-contain"
                  />
                ) : (
                  "-"
                )}
              </td>

              <td className="p-3">{c.nama_klien}</td>

              <td className="p-3">
                {c.website ? (
                  <a
                    href={c.website}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {c.website}
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="p-3 text-center">
                <button
                  onClick={() => toggleStatus(c.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    c.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {c.is_active ? "Aktif" : "Nonaktif"}
                </button>
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-3">
                  <PencilLine
                    size={18}
                    onClick={() => onEdit(c)}
                    className="cursor-pointer text-blue-600 hover:scale-110"
                  />
                  <Trash2
                    size={18}
                    onClick={() => onDelete(c)}
                    className="cursor-pointer text-red-600 hover:scale-110"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
