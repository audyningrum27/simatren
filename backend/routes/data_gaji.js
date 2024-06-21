import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/gaji', (req, res) => {
    console.log("GET /api/data_gaji/gaji");
    const query = 'SELECT * FROM data_gaji';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

router.post('/gaji', (req, res) => {
    const { nip, nama_pegawai, gaji_dasar, tunjangan, potongan } = req.body;
    const query = 'INSERT INTO data_gaji (nip, nama_pegawai, gaji_dasar, tunjangan, potongan) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nip, nama_pegawai, gaji_dasar, tunjangan, potongan], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.status(201).json({ message: 'Data Gaji Berhasil Ditambahkan!' });
    });
});

export default router;
