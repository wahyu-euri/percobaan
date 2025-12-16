import { useEffect, useState } from "react";
import UserTable from "../../components/admin/tables/UserTable";
import api from "../../api/api";

export default function Pengguna() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/pengguna")
      .then((res) => setUsers(res.data.data ?? res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <UserTable users={users} />;
}
