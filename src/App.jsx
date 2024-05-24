import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./AdminPage/components/content/Layout";
import Dashboard from "./AdminPage/components/pages/Dashboard/Dashboard";
import ManajemenPegawai from "./AdminPage/components/pages/Manajemen-Pegawai/ManajemenPegawai";
import LoginPage from "./AdminPage/components/pages/LoginPage";
import ManajemenGaji from "./AdminPage/components/pages/Manajemen-Gaji/ManajemenGaji";
import ManajemenPresensi from "./AdminPage/components/pages/ManajemenPresensi";
import ManajemenPelatihan from "./AdminPage/components/pages/ManajemenPelatihan";
import ManajemenKinerja from "./AdminPage/components/pages/ManajemenKinerja";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="manajemen_pegawai" element={<ManajemenPegawai />} />
          <Route path="manajemen_gaji" element={<ManajemenGaji />} />
          <Route path="manajemen_presensi" element={<ManajemenPresensi />} />
          <Route path="manajemen_pelatihan" element={<ManajemenPelatihan />} />
          <Route path="manajemen_kinerja" element={<ManajemenKinerja />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App;
