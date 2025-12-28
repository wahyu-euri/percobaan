import { useEffect, useState, useCallback } from "react";
import api from "../../api/api";
import UserTable from "../../components/admin/tables/UserTable";
import UserForm from "../../components/admin/forms/UserForm";
import AlertModal from "../../components/admin/modals/AlertModal";
import ConfirmModal from "../../components/admin/modals/ConfirmModal";

export default function Pengguna() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // ==============================
  // LOAD USERS (STABLE)
  // ==============================
  const loadUsers = useCallback(
    async (pageNumber = 1, newPerPage = perPage) => {
      setLoading(true);
      try {
        const res = await api.get("/admin/pengguna", {
          params: {
            page: pageNumber,
            per_page: newPerPage,
            search,
            status,
          },
        });

        setUsers(res.data.data ?? []);
        setPage(res.data.current_page);
        setLastPage(res.data.last_page);
        setPerPage(newPerPage);
      } catch (err) {
        setAlert({
          type: "error",
          message: "Gagal mengambil data pengguna",
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [search, status, perPage]
  );

  // ==============================
  // SEARCH & FILTER (DEBOUNCE)
  // ==============================
  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, status, loadUsers]);

  // ==============================
  // FIRST LOAD
  // ==============================
  useEffect(() => {
    loadUsers(1);
  }, [loadUsers]);

  // ==============================
  // SAVE USER
  // ==============================
  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("status", data.status);
    if (data.password) formData.append("password", data.password);
    if (data.foto) formData.append("foto", data.foto);

    try {
      if (selectedUser) {
        await api.post(
          `/admin/pengguna/${selectedUser.id}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await api.post("/admin/pengguna", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowForm(false);
      setSelectedUser(null);

      setAlert({
        type: "success",
        message: selectedUser
          ? "Pengguna berhasil diubah"
          : "Pengguna berhasil ditambahkan",
      });

      loadUsers(page, perPage);
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan",
      });
    }
  };

  // ==============================
  // DELETE USER
  // ==============================
  const handleDelete = (u) => {
    setConfirm({
      message: "Yakin ingin menghapus pengguna?",
      onConfirm: async () => {
        try {
          await api.delete(`/admin/pengguna/${u.id}`);
          setConfirm(null);
          setAlert({
            type: "success",
            message: "User berhasil dihapus",
          });
          loadUsers(page, perPage);
        } catch {
          setAlert({
            type: "error",
            message: "Gagal menghapus user",
          });
        }
      },
    });
  };

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="p-6">
      <UserTable
        users={users}
        page={page}
        lastPage={lastPage}
        perPage={perPage}
        loading={loading}
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPageChange={loadUsers}
        onAdd={() => {
          setSelectedUser(null);
          setShowForm(true);
        }}
        onEdit={(u) => {
          setSelectedUser(u);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <UserForm
          initialData={selectedUser}
          onClose={() => setShowForm(false)}
          onSubmit={handleSave}
        />
      )}

      {alert && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
