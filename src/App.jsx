import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';

import Layout from './AdminPage/components/content/Layout';
import Dashboard from './AdminPage/components/pages/Dashboard/Dashboard';
import ManajemenPegawai from './AdminPage/components/pages/Manajemen-Pegawai/ManajemenPegawai';
import TambahDataPegawai from './AdminPage/components/pages/Manajemen-Pegawai/TambahDataPegawai';
import DetailPegawai from './AdminPage/components/pages/Manajemen-Pegawai/DetailPegawai';
import ManajemenGaji from './AdminPage/components/pages/Manajemen-Gaji/ManajemenGaji';
import TambahDataGaji from './AdminPage/components/pages/Manajemen-Gaji/TambahDataGaji';
import ManajemenPresensi from './AdminPage/components/pages/Manajemen-Presensi/ManajemenPresensi';
import ManajemenCuti from './AdminPage/components/pages/Manajemen-Cuti/ManajemenCuti';
import HistoriCutiPegawai from './AdminPage/components/pages/Manajemen-Cuti/HistoriCutiPegawai';
import HistoryPelatihan from './AdminPage/components/pages/Manajemen-Pelatihan/HistoryPelatihan';
import JadwalPelatihan from './AdminPage/components/pages/Manajemen-Pelatihan/JadwalPelatihan';
import TambahJadwalPelatihan from './AdminPage/components/pages/Manajemen-Pelatihan/TambahJadwalPelatihan';
import DetailJadwalPelatihan from './AdminPage/components/pages/Manajemen-Pelatihan/DetailJadwalPelatihan';
import DetailHistoryPelatihan from './AdminPage/components/pages/Manajemen-Pelatihan/DetailHistoryPelatihan';
import ManajemenKinerja from './AdminPage/components/pages/Manajemen-Kinerja/ManajemenKinerja';
import GrafikManajemenKinerja from './AdminPage/components/pages/Manajemen-Kinerja/Grafik-Kinerja/GrafikManajemenKinerja';

import LayoutUser from "./UserPage/components/content/LayoutUser";
import ProfilEdit from "./UserPage/components/pages/ProfilEdit";
import HistoriPresensi from './UserPage/components/pages/Presensi/HistoriPresensi';
import ScanQR from './UserPage/components/pages/Presensi/ScanQR';
import Penggajian from './UserPage/components/pages/Penggajian';
import PengajuanCuti from "./UserPage/components/pages/Cuti/PengajuanCuti";
import HistoriCuti from "./UserPage/components/pages/Cuti/HistoriCuti";
import PelaporanPelatihan from "./UserPage/components/pages/Pelatihan/PelaporanPelatihan";
import HistoriPelatihan from "./UserPage/components/pages/Pelatihan/HistoriPelatihan";
import JadwalPelatihanUser from './UserPage/components/pages/Pelatihan/JadwalPelatihan';
import Kinerja from './UserPage/components/pages/Kinerja/Kinerja';

import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* Admin Page */}
          <Route path="/AdminPage" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="/AdminPage/manajemen_pegawai" element={<ManajemenPegawai />} />
            <Route path="/AdminPage/tambah_data_pegawai" element={<TambahDataPegawai />} />
            <Route path="/AdminPage/detail_pegawai/:id_pegawai" element={<DetailPegawai />} />
            <Route path="/AdminPage/manajemen_gaji" element={<ManajemenGaji />} />
            <Route path="/AdminPage/tambah_data_gaji" element={<TambahDataGaji />} />
            <Route path="/AdminPage/manajemen_presensi" element={<ManajemenPresensi />} />
            <Route path="/AdminPage/manajemen_cuti" element={<ManajemenCuti />} />
            <Route path="/AdminPage/histori_cuti_pegawai" element={<HistoriCutiPegawai />} />
            <Route path="/AdminPage/histori_pelatihan" element={<HistoryPelatihan />} />
            <Route path="/AdminPage/jadwal_pelatihan" element={<JadwalPelatihan />} />
            <Route path="/AdminPage/detail_history_pelatihan/:id_historipelatihan" element={<DetailHistoryPelatihan />} />
            <Route path="/AdminPage/detail_jadwal_pelatihan/:id_pelatihan" element={<DetailJadwalPelatihan />} />
            <Route path="/AdminPage/atur_jadwal_pelatihan" element={<TambahJadwalPelatihan />} />
            <Route path="/AdminPage/manajemen_kinerja" element={<ManajemenKinerja />} />
            <Route path="/AdminPage/grafik_kinerja" element={<GrafikManajemenKinerja />} />
            <Route path="/AdminPage/manajemen_cuti" element={<ManajemenCuti />} />
          </Route>

          {/* User Page */}
          <Route path="/UserPage" element={
            <PrivateRoute>
              <LayoutUser />
            </PrivateRoute>
          }>
            <Route index element={<ProfilEdit />} />
            <Route path="/UserPage/historipresensi" element={<HistoriPresensi />} />
            <Route path="/UserPage/scan-qr" element={<ScanQR />} />
            <Route path="/UserPage/penggajian" element={<Penggajian />} />
            <Route path="/UserPage/pengajuan_cuti" element={<PengajuanCuti />} />
            <Route path="/UserPage/histori_cuti" element={<HistoriCuti />} />
            <Route path="/UserPage/pelaporan_pelatihan" element={<PelaporanPelatihan />} />
            <Route path="/UserPage/histori_pelatihan" element={<HistoriPelatihan />} />
            <Route path="/UserPage/jadwal_pelatihan" element={<JadwalPelatihanUser />} />
            <Route path="/UserPage/grafik_kinerja" element={<Kinerja />} />
          </Route>

          <Route path="logout" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
