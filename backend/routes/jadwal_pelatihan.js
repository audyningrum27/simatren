import express from 'express';
import db from '../db.js';
import moment from 'moment';

const router = express.Router();

// Function to determine status based on dates
const determineStatus = (tanggal_mulai, tanggal_selesai) => {
    const now = moment();
    if (now.isBefore(tanggal_mulai)) {
        return 'Belum Dimulai';
    } else if (now.isBetween(tanggal_mulai, tanggal_selesai)) {
        return 'Proses';
    } else {
        return 'Selesai';
    }
};

router.post('/jadwalpelatihan', (req, res) => {
    const { nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan } = req.body;
    const status = determineStatus(moment(tanggal_mulai), moment(tanggal_selesai));
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
        
        const updatedResults = results.map((item) => ({
            ...item,
            status: determineStatus(moment(item.tanggal_mulai), moment(item.tanggal_selesai))
        }));

        return res.json(updatedResults);
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
                const updatedResult = {
                    ...result[0],
                    status: determineStatus(moment(result[0].tanggal_mulai), moment(result[0].tanggal_selesai))
                };
                res.json(updatedResult);
            } else {
                res.status(404).json({ error: 'Pelatihan not found' });
            }
        }
    });
});

export default router;
