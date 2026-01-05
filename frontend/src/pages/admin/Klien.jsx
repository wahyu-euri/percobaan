import { useEffect, useState } from "react";
import api from "../../api/api";
import ClientTable from "../../components/admin/tables/ClientTable";
import ClientForm from "../../components/admin/forms/ClientForm";
import ConfirmModal from "../../components/admin/modals/ConfirmModal";

export default function Klien() {
  const [clients, setClients] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      const res = await api.get("/admin/klien");
      setClients(res.data);
    };

    loadClients();
  }, []);

  const refresh = async () => {
    const res = await api.get("/admin/klien");
    setClients(res.data);
  };

  const handleDelete = async () => {
    if (!confirm) return;

    await api.delete(`/clients/${confirm.id}`);
    setConfirm(null);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Data Klien</h1>
        <button
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
          className="px-4 py-2 bg-black text-white rounded"
        >
          + Tambah Klien
        </button>
      </div>

      <ClientTable
        clients={clients}
        onEdit={(data) => {
          setSelected(data);
          setOpenForm(true);
        }}
        onDelete={(data) => setConfirm(data)}
        refresh={refresh}
      />

      {openForm && (
        <ClientForm
          data={selected}
          onClose={() => setOpenForm(false)}
          refresh={refresh}
        />
      )}

      {confirm && (
        <ConfirmModal
          title="Hapus Klien?"
          onCancel={() => setConfirm(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
