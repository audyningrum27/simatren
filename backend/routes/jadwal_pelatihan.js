import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/jadwalpelatihan', (req, res) => {
    const { nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan } = req.body;
    const status = 'Belum Dimulai'; // Contoh nilai default
    const sql = `
        INSERT INTO jadwal_pelatihan (nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, status];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Pelatihan added successfully', id: result.insertId });
        }
    });
});

router.get('/jadwalpelatihan', (req, res) => {
    console.log("GET /api/jadwal_pelatihan/jadwalpelatihan");
    const query = 'SELECT * FROM jadwal_pelatihan';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

router.get('/jadwalpelatihan/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const sql = `SELECT * FROM jadwal_pelatihan WHERE id_pelatihan = ?`;
    db.query(sql, [id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Pelatihan not found' });
            }
        }
    });
});

export default router;
