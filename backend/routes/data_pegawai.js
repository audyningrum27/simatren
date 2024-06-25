import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/pegawai', (req, res) => {
    const { nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, password, role, status_bpjs, status_kawin, anggota_keluarga, jumlah_tanggungan } = req.body;
    const status_kepegawaian = 'Aktif'; // Default status kepegawaian "Aktif"
    const sql = `
        INSERT INTO data_pegawai (nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, password, role, status_bpjs, status_kepegawaian, status_kawin, anggota_keluarga, jumlah_tanggungan)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, password, role, status_bpjs, status_kepegawaian, status_kawin, anggota_keluarga, jumlah_tanggungan];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Pegawai added successfully', id: result.insertId });
        }
    });
});

router.get('/pegawai', (req, res) => {
    console.log("GET /api/data_pegawai/pegawai");
    const query = 'SELECT * FROM data_pegawai';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

router.get('/pegawai/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const sql = `SELECT * FROM data_pegawai WHERE id_pegawai = ?`;
    db.query(sql, [id_pegawai], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Pegawai not found' });
            }
        }
    });
});

router.delete('/pegawai/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const sql = 'DELETE FROM data_pegawai WHERE id_pegawai = ?';
    db.query(sql, [id_pegawai], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Pegawai deleted successfully' });
        }
    });
});

router.put('/pegawai/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const { nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, role, status_bpjs, status_kepegawaian, anggota_keluarga, jumlah_tanggungan } = req.body;
    const sql = `
        UPDATE data_pegawai
        SET
            nama_pegawai = ?,
            nip = ?,
            tempat_lahir = ?,
            tanggal_lahir = ?,
            jenis_kelamin = ?,
            alamat = ?,
            no_telp = ?,
            email = ?,
            role =  ?,
            status_bpjs = ?,
            status_kepegawaian = ?,
            anggota_keluarga = ?,
            jumlah_tanggungan = ?
        WHERE id_pegawai = ?
    `;
    const values = [nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, role, status_bpjs, status_kepegawaian, anggota_keluarga, jumlah_tanggungan, id_pegawai];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Pegawai updated successfully' });
        }
    });
});

// Menghitung Pegawai Aktif
router.get('/pegawai/active/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS active_count FROM data_pegawai WHERE status_kepegawaian = "Aktif"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('Hasil jumlah pegawai aktif:', results); // Log debug
        return res.json(results[0]);
    });
});


// Menghitung Total Pegawai
router.get('/pegawai/total/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS total_count FROM data_pegawai';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('Hasil jumlah total pegawai:', results); // Log debug
        return res.json(results[0]);
    });
});

// Menghitung Pegawai Cuti
router.get('/pegawai/cuti/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS cuti_count FROM data_pegawai WHERE status_kepegawaian = "Cuti"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('Hasil jumlah pegawai cuti:', results); // Log debug
        return res.json(results[0]);
    });
});


export default router;


// Menghitung Role atau Kategori Pegawai
router.get('/pegawai/role/count', (req, res) => {
    const sql = `
        SELECT role, COUNT(*) as count
        FROM data_pegawai
        GROUP BY role
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results);
    });
});

