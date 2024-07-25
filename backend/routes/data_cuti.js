import express from 'express';
import db from '../db.js';

const router = express.Router();

//Menampilkan Data Cuti Pada Manajemen Cuti
router.get('/cuti/all', (req, res) => {
    console.log("GET /api/data_cuti/cuti/all");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        c.id_cuti,
        c.id_pegawai,
        c.tanggal_mulai,
        c.tanggal_selesai,
        c.alasan_cuti,
        c.status_cuti
    FROM 
        data_cuti c
    JOIN 
        data_pegawai p ON c.id_pegawai = p.id_pegawai;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

// Menampilkan data cuti dalam bentuk grafik di dashboard
router.get('/cuti/approved', (req, res) => {
    console.log("GET /api/data_cuti/cuti/approved");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        c.id_cuti,
        c.id_pegawai,
        c.tanggal_mulai,
        c.tanggal_selesai,
        c.alasan_cuti,
        c.status_cuti
    FROM 
        data_cuti c
    JOIN 
        data_pegawai p ON c.id_pegawai = p.id_pegawai
    WHERE
        c.status_cuti = 'Diterima';
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

//Menampilkan data cuti dalam bentuk grafik perbulan di grafik kinerja
router.get('/cuti/approved/:id_pegawai', (req, res) => {
    console.log("GET /api/data_cuti/cuti/approved/:id_pegawai");
    const { id_pegawai } = req.params;
    if (!id_pegawai) {
        return res.status(400).json({ message: 'id_pegawai is required' });
    }

    const query = `
    SELECT 
        MONTH(tanggal_mulai) AS bulan,
        YEAR(tanggal_mulai) AS tahun,
        CAST(SUM(DATEDIFF(tanggal_selesai, tanggal_mulai) + 1) AS UNSIGNED) AS jumlah_cuti
    FROM 
        data_cuti
    WHERE
        status_cuti = 'Diterima'
        AND id_pegawai = ?
    GROUP BY 
        MONTH(tanggal_mulai), YEAR(tanggal_mulai)
    ORDER BY 
        tahun, bulan;
    `;

    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        console.log('Jumlah entri cuti diterima per bulan untuk pegawai:', results);
        return res.json(results);
    });
});

//Menambah Data Cuti Pada User
router.post('/cuti', (req, res) => {
    const { id_pegawai, tanggalMulai, tanggalSelesai, alasanCuti } = req.body;
    const query = `
        INSERT INTO data_cuti (id_pegawai, tanggal_mulai, tanggal_selesai, alasan_cuti, status_cuti)
        VALUES (?, ?, ?, ?, 'Proses')
    `;
    db.query(query, [id_pegawai, tanggalMulai, tanggalSelesai, alasanCuti], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.status(201).json({ message: 'Pengajuan Cuti Berhasil', id_cuti: result.insertId });
    });
});

//Menampilkan Data Cuti Pada User
router.get('/cuti/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const query = `
    SELECT 
        c.id_cuti,
        c.id_pegawai,
        c.tanggal_mulai,
        c.tanggal_selesai,
        c.alasan_cuti,
        c.status_cuti
    FROM 
        data_cuti c
    WHERE 
        c.id_pegawai = ?
    `;
    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

// Memperbarui Status Cuti
router.put('/cuti/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const { status_cuti } = req.body;
    const query = `
        UPDATE data_cuti
        SET status_cuti = ?
        WHERE id_cuti = ?
    `;
    db.query(query, [status_cuti, id_pegawai], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cuti tidak ditemukan' });
        }

        return res.status(200).json({ message: 'Status cuti berhasil diperbarui' });
    });
});

// Mengambil data cuti harian
router.get('/cuti/daily', (req, res) => {
    const { date } = req.query;
    const query = `
        SELECT 
            COUNT(*) AS Cuti
        FROM 
            data_cuti
        WHERE 
            DATE(tanggal_mulai) <= ? AND DATE(tanggal_selesai) >= ?
    `;
    db.query(query, [date, date], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results[0]);
    });
});

export default router;