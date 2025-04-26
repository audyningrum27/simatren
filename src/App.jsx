import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';

import Layout from './AdminPage/components/content/Layout';
import Dashboard from './AdminPage/components/pages/Dashboard/Dashboard';
import ManajemenPegawai from './AdminPage/components/pages/Manajemen-Pegawai/ManajemenPegawai';
import TambahDataPegawai from './AdminPage/components/pages/Manajemen-Pegawai/TambahDataPegawai';
import DetailPegawai from './AdminPage/components/pages/Manajemen-Pegawai/DetailPegawai';
import ManajemenRole from './AdminPage/components/pages/Manajemen-Pegawai/ManajemenRole';
import TambahDataRole from './AdminPage/components/pages/Manajemen-Pegawai/TambahDataRole';
import DetailDataRole from './AdminPage/components/pages/Manajemen-Pegawai/DetailDataRole';
import ManajemenGaji from './AdminPage/components/pages/Manajemen-Gaji/ManajemenGaji';
import TambahDataGaji from './AdminPage/components/pages/Manajemen-Gaji/TambahDataGaji';
import TambahGajiExcel from './AdminPage/components/pages/Manajemen-Gaji/TambahGajiExcel';
import ManajemenPresensi from './AdminPage/components/pages/Manajemen-Presensi/ManajemenPresensi';
import LaporanKinerja from './AdminPage/components/pages/Manajemen-Presensi/LaporanKinerja';
import ManajemenCuti from './AdminPage/components/pages/Manajemen-Cuti/ManajemenCuti';
import HistoriCutiPegawai from './AdminPage/components/pages/Manajemen-Cuti/HistoriCutiPegawai';
import ManajemenRapat from './AdminPage/components/pages/Manajemen-Rapat/ManajemenRapat';
import TambahRapat from './AdminPage/components/pages/Manajemen-Rapat/TambahRapat';
import RiwayatRapat from './AdminPage/components/pages/Manajemen-Rapat/RiwayatRapat';
import DetailRapat from './AdminPage/components/pages/Manajemen-Rapat/DetailRapat';
import DataPresensiRapat from './AdminPage/components/pages/Manajemen-Rapat/DataPresensiRapat';
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
import Rapat from "./UserPage/components/pages/Rapat/Rapat";
import HistoriRapat from "./UserPage/components/pages/Rapat/HistoriRapat";
import DetailRapatUser from "./UserPage/components/pages/Rapat/DetailRapatUser";
import PelaporanPelatihan from "./UserPage/components/pages/Pelatihan/PelaporanPelatihan";
import HistoriPelatihanPegawai from './UserPage/components/pages/Pelatihan/HistoriPelatihanPegawai';
import DetailHistoriPelatihanPegawai from './UserPage/components/pages/Pelatihan/DetailHistoriPelatihanPegawai';
import JadwalPelatihanPegawai from './UserPage/components/pages/Pelatihan/JadwalPelatihanPegawai';
import DetailJadwalPelatihanPegawai from './UserPage/components/pages/Pelatihan/DetailJadwalPelatihanPegawai';
import Kinerja from './UserPage/components/pages/Kinerja/Kinerja';
import PresensiForm from './UserPage/components/pages/Presensi/PresensiForm';
import Role from './UserPage/components/pages/Presensi/Role';

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
            <PrivateRoute allowedUserTypes={['admin@gmail.com']}>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="/AdminPage/manajemen_pegawai" element={<ManajemenPegawai />} />
            <Route path="/AdminPage/tambah_data_pegawai" element={<TambahDataPegawai />} />
            <Route path="/AdminPage/detail_pegawai/:id_pegawai" element={<DetailPegawai />} />
            <Route path="/AdminPage/manajemen_role" element={<ManajemenRole />} />
            <Route path="/AdminPage/tambah_data_role" element={<TambahDataRole />} />
            <Route path="/AdminPage/detail_data_role/:id_role" element={<DetailDataRole />} />
            <Route path="/AdminPage/manajemen_gaji" element={<ManajemenGaji />} />
            <Route path="/AdminPage/tambah_data_gaji" element={<TambahDataGaji />} />
            <Route path="/AdminPage/tambah_data_gaji_excel" element={<TambahGajiExcel />} />
            <Route path="/AdminPage/manajemen_presensi" element={<ManajemenPresensi />} />
            <Route path="/AdminPage/laporan_kinerja/:id_presensi" element={<LaporanKinerja />} />
            <Route path="/AdminPage/manajemen_cuti" element={<ManajemenCuti />} />
            <Route path="/AdminPage/histori_cuti_pegawai" element={<HistoriCutiPegawai />} />
            <Route path="/AdminPage/manajemen_rapat" element={<ManajemenRapat />} />
            <Route path="/AdminPage/tambah_rapat" element={<TambahRapat />} />
            <Route path="/AdminPage/riwayat_rapat" element={<RiwayatRapat />} />
            <Route path="/AdminPage/detail_rapat" element={<DetailRapat />} />
            <Route path="/AdminPage/data_presensi_rapat" element={<DataPresensiRapat />} />
            <Route path="/AdminPage/histori_pelatihan" element={<HistoryPelatihan />} />
            <Route path="/AdminPage/jadwal_pelatihan" element={<JadwalPelatihan />} />
            <Route path="/AdminPage/detail_history_pelatihan/:id_pelatihan" element={<DetailHistoryPelatihan />} />
            <Route path="/AdminPage/detail_jadwal_pelatihan/:id_pelatihan" element={<DetailJadwalPelatihan />} />
            <Route path="/AdminPage/atur_jadwal_pelatihan" element={<TambahJadwalPelatihan />} />
            <Route path="/AdminPage/manajemen_kinerja" element={<ManajemenKinerja />} />
            <Route path="/AdminPage/grafik_kinerja/:id_pegawai" element={<GrafikManajemenKinerja />} />
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
            <Route path="/UserPage/rapat" element={<Rapat />} />
            <Route path="/UserPage/histori_rapat" element={<HistoriRapat />} />
            <Route path="/UserPage/detail_rapat_pegawai" element={<DetailRapatUser />} />
            <Route path="/UserPage/pelaporan_pelatihan" element={<PelaporanPelatihan />} />
            <Route path="/UserPage/histori_pelatihan_pegawai" element={<HistoriPelatihanPegawai />} />
            <Route path="/UserPage/jadwal_pelatihan_pegawai" element={<JadwalPelatihanPegawai />} />
            <Route path="/UserPage/detail_histori_pelatihan_pegawai/:id_pelatihan" element={<DetailHistoriPelatihanPegawai />} />
            <Route path="/UserPage/detail_jadwal_pelatihan_pegawai/:id_pelatihan" element={<DetailJadwalPelatihanPegawai />} />
            <Route path="/UserPage/grafik_kinerja" element={<Kinerja />} />
            <Route path="/UserPage/lengkapi_presensi/:id_presensi" element={<PresensiForm />} />
            <Route path="/UserPage/ceklis_harian/:id_presensi" element={<Role/>} />
          </Route>

          <Route path="logout" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
