import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import AdminLayout from "./layouts/AdminLayout";

import Dasbor from "./pages/admin/Dasbor";
import Portofolio from "./pages/admin/Portofolio";
import KatalogProduk from "./pages/admin/KatalogProduk";
import Layanan from "./pages/admin/Layanan";
import Klien from "./pages/admin/Klien";
import Pengguna from "./pages/admin/Pengguna";
import InfoKontak from "./pages/admin/InfoKontak";
import ProfilPerusahaan from "./pages/admin/ProfilPerusahaan";
import Aset from "./pages/admin/Aset";
import InformasiTerkini from "./pages/admin/Informasiterkini";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/dasbor"
        element={
          <AdminLayout>
            <Dasbor />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/portofolio"
        element={
          <AdminLayout>
            <Portofolio />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/katalog"
        element={
          <AdminLayout>
            <KatalogProduk />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/layanan"
        element={
          <AdminLayout>
            <Layanan />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/klien"
        element={
          <AdminLayout>
            <Klien />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/pengguna"
        element={
          <AdminLayout>
            <Pengguna />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/info-kontak"
        element={
          <AdminLayout>
            <InfoKontak />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/profil"
        element={
          <AdminLayout>
            <ProfilPerusahaan />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/aset"
        element={
          <AdminLayout>
            <Aset />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/informasi"
        element={
          <AdminLayout>
            <InformasiTerkini />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
