import express from 'express';
import db from '../db.js';

const router = express.Router();

//ADMIN
router.get('/gaji', (req, res) => {
    console.log("GET /api/data_gaji/gaji");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        g.id_gaji,
        g.id_pegawai,
        g.bulan_gaji,
        g.gaji_dasar,
        g.tunjangan,
        g.potongan,
        g.total
    FROM 
        data_gaji g
    JOIN 
        data_pegawai p ON g.id_pegawai = p.id_pegawai
    ORDER BY 
        p.nama_pegawai ASC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

router.post('/gaji', (req, res) => {
    const { id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan } = req.body;
    const query = 'INSERT INTO data_gaji (id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.status(201).json({ message: 'Data Gaji Berhasil Ditambahkan!' });
    });
});

//USER
router.get('/gaji/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    console.log("GET /api/data_gaji/gaji/:id_pegawai");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        g.id_gaji,
        g.id_pegawai,
        g.bulan_gaji,
        g.gaji_dasar,
        g.tunjangan,
        g.potongan,
        g.total,
        g.status_gaji
    FROM 
        data_gaji g
    JOIN 
        data_pegawai p ON g.id_pegawai = p.id_pegawai
    WHERE 
        g.id_pegawai = ?
    `;
    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

export default router;
