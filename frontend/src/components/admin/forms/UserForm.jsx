import { useState } from "react";

export default function UserForm({ onSubmit, initialData = null }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    status: initialData?.status ?? true,
    photo: null,
    photoPreview: initialData?.photo || null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setForm({
        ...form,
        photo: file,
        photoPreview: file ? URL.createObjectURL(file) : null,
      });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-xl shadow">
      <div>
        <label className="block text-sm font-medium">Nama</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="mt-1"
        />

        {form.photoPreview && (
          <img
            src={form.photoPreview}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover rounded-lg border"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="status"
          checked={form.status}
          onChange={handleChange}
        />
        <span>Aktif</span>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
      >
        Simpan
      </button>
    </form>
  );
}
