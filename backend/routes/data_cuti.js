import express from 'express';
import db from '../db.js';

const router = express.Router();

//Menampilkan Data Cuti Pada Admin
router.get('/cuti', (req, res) => {
    console.log("GET /api/data_cuti/cuti");
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
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

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