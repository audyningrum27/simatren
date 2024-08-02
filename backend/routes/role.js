import express from 'express';
import db from '../db.js';

const router = express.Router();

// Melengkapi Presensi Ceklis Harian Non TPA
router.post('/ceklis-harian/non-tpa/:id_presensi', (req, res) => {
    const { id_presensi } = req.params;
    let { masakNasi, masakLauk, membuatBubur, kontrolKompor, cekNasiSisa, cuciAlatMasak, distribusiLauk, jumatBersih, gantiSupirLibur } = req.body;

    // Mengubah nilai boolean menjadi 'ya' atau 'tidak'
    masakNasi = masakNasi ? 'ya' : 'tidak';
    masakLauk = masakLauk ? 'ya' : 'tidak';
    membuatBubur = membuatBubur ? 'ya' : 'tidak';
    kontrolKompor = kontrolKompor ? 'ya' : 'tidak';
    cekNasiSisa = cekNasiSisa ? 'ya' : 'tidak';
    cuciAlatMasak = cuciAlatMasak ? 'ya' : 'tidak';
    distribusiLauk = distribusiLauk ? 'ya' : 'tidak';
    jumatBersih = jumatBersih ? 'ya' : 'tidak';
    gantiSupirLibur = gantiSupirLibur ? 'ya' : 'tidak';

    const query = `
        INSERT INTO role_staf_dapur (id_presensi, masak_nasi, masak_lauk, membuat_bubur, kontrol_kompor, cek_nasi_sisa, cuci_alat_masak, distribusi_lauk, jumat_bersih, ganti_supir_libur)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [id_presensi, masakNasi, masakLauk, membuatBubur, kontrolKompor, cekNasiSisa, cuciAlatMasak, distribusiLauk, jumatBersih, gantiSupirLibur], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data', error: error.message });
        }
        res.status(200).json({ message: 'Data berhasil disimpan' });
    });
});

// Melengkapi Presensi Ceklis Harian Guru dan TPA
router.post('/ceklis-harian/guru/:id_presensi', (req, res) => {
    const { id_presensi } = req.params;
    let { menyusunRencana, menyiapkanMateri, sesuaiJadwal, catatKehadiran, menilaiTugas, catatKemajuan, mengikutiPelatihan } = req.body;

    // Mengubah nilai boolean menjadi 'ya' atau 'tidak'
    menyusunRencana = menyusunRencana ? 'ya' : 'tidak';
    menyiapkanMateri = menyiapkanMateri ? 'ya' : 'tidak';
    sesuaiJadwal = sesuaiJadwal ? 'ya' : 'tidak';
    catatKehadiran = catatKehadiran ? 'ya' : 'tidak';
    menilaiTugas = menilaiTugas ? 'ya' : 'tidak';
    catatKemajuan = catatKemajuan ? 'ya' : 'tidak';
    mengikutiPelatihan = mengikutiPelatihan ? 'ya' : 'tidak';

    const query = `
        INSERT INTO role_guru (id_presensi, menyusun_rencana, menyiapkan_materi, sesuai_jadwal, catat_kehadiran, menilai_tugas, catat_kemajuan, mengikuti_pelatihan)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [id_presensi, menyusunRencana, menyiapkanMateri, sesuaiJadwal, catatKehadiran, menilaiTugas, catatKemajuan, mengikutiPelatihan], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data', error: error.message });
        }
        res.status(200).json({ message: 'Data berhasil disimpan' });
    });
});

// Mengambil data role Non TPA berdasarkan id_presensi
router.get('/laporan-kinerja/non-tpa/:id_presensi', (req, res) => {
    const { id_presensi } = req.params;
    
    const query = `SELECT * FROM role_staf_dapur WHERE id_presensi = ?`;
    
    db.query(query, [id_presensi], (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data', error: error.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.status(200).json(results[0]);
    });
});

// Mengambil data role Guru dan TPA berdasarkan id_presensi
router.get('/laporan-kinerja/guru/:id_presensi', (req, res) => {
    const { id_presensi } = req.params;
    
    const query = `SELECT * FROM role_guru WHERE id_presensi = ?`;
    
    db.query(query, [id_presensi], (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data', error: error.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }
        res.status(200).json(results[0]);
    });
});

export default router;
