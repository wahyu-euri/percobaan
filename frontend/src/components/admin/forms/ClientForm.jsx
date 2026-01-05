import { useState } from "react";
import api from "../../../api/api";
import { X } from "lucide-react";

export default function ClientForm({ data, onClose, refresh }) {
  const [nama, setNama] = useState(data?.nama_klien || "");
  const [website, setWebsite] = useState(data?.website || "");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(
    data?.foto
      ? `${import.meta.env.VITE_API_URL}/storage/${data.foto}`
      : null
  );

  const submit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("nama_klien", nama);
    form.append("website", website);
    if (foto) form.append("foto", foto);

    if (data) {
      await api.post(`/clients/${data.id}`, form);
    } else {
      await api.post("/clients", form);
    }

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form
        onSubmit={submit}
        className="bg-white w-[400px] p-4 rounded space-y-3"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold">
            {data ? "Edit Klien" : "Tambah Klien"}
          </h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <input
          className="input"
          placeholder="Nama Klien"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => {
            setFoto(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img src={preview} className="h-20 object-contain border rounded" />
        )}

        <button className="w-full bg-black text-white py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}
