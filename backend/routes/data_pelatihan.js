import express from 'express';
import db from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/pelatihan-per-bulan', (req, res) => {
    const query = `
    SELECT 
      MONTH(tanggal_mulai) AS bulan, 
      COUNT(*) AS jumlah_pelatihan
    FROM jadwal_pelatihan
    GROUP BY MONTH(tanggal_mulai)
  `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ADMIN
// Menampilkan Data Pelatihan
router.get('/pelatihan', (req, res) => {
    console.log("GET /api/data_pelatihan/pelatihan");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        pel.id_pelatihan,
        pel.id_pegawai,
        pel.nama_penyelenggara,
        pel.nama_kegiatan,
        pel.tanggal_mulai,
        pel.tanggal_selesai,
        pel.deskripsi_kegiatan,
        pel.status,
        pel.bukti_pelaksanaan,
        pel.sertifikat
    FROM 
        data_pelatihan pel
    JOIN 
        data_pegawai p ON pel.id_pegawai = p.id_pegawai
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

//Menampilkan Detail Pelatihan
router.get('/pelatihan/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const sql = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        pel.id_pelatihan,
        pel.id_pegawai,
        pel.nama_penyelenggara,
        pel.nama_kegiatan,
        pel.tanggal_mulai,
        pel.tanggal_selesai,
        pel.deskripsi_kegiatan,
        pel.status,
        pel.bukti_pelaksanaan,
        pel.sertifikat
    FROM 
        data_pelatihan pel
    JOIN 
        data_pegawai p ON pel.id_pegawai = p.id_pegawai
    WHERE 
        id_pelatihan = ?
    `;
    db.query(sql, [id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                let pelatihan = result[0];
                if (pelatihan.bukti_pelaksanaan) {
                    let imageType = 'jpeg'; // Default
                    const buffer = Buffer.from(pelatihan.bukti_pelaksanaan);
                    if (buffer.slice(0, 4).toString('hex') === '89504e47') {
                        imageType = 'png';
                    }
                    pelatihan.bukti_pelaksanaan = {
                        data: buffer.toString('base64'),
                        type: imageType
                    };
                }

                res.json(pelatihan);
            } else {
                res.status(404).json({ error: 'Pelatihan not found' });
            }
        }
    });
});

// Mengupload sertifikat
router.post('/upload/:id_pelatihan', upload.single('sertifikat'), (req, res) => {
    const { id_pelatihan } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileBuffer = file.buffer;

    const query = 'UPDATE data_pelatihan SET sertifikat = ? WHERE id_pelatihan = ?';
    db.query(query, [fileBuffer, id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error uploading file to the database:', err);
            return res.status(500).json({ message: 'Error uploading file' });
        }
        res.status(200).json({ message: 'File uploaded successfully' });
    });
});

// Menampilkan Sertifikat
router.get('/sertifikat/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const query = `SELECT sertifikat FROM data_pelatihan WHERE id_pelatihan = ?`;
    db.query(query, [id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error fetching sertifikat:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length === 0 || !result[0].sertifikat) {
            return res.status(404).json({ error: 'Sertifikat not found' });
        }
        const fileBuffer = result[0].sertifikat;
        res.setHeader('Content-Type', 'application/pdf');
        res.send(fileBuffer);
    });
});

// Menambah Jadwal Pelatihan
router.post('/pelatihan', (req, res) => {
    const { id_pegawai, nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan } = req.body;
    const status = 'Belum Dimulai';
    const query = `INSERT INTO data_pelatihan (id_pegawai, nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [id_pegawai, nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, status], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Jadwal Pelatihan created successfully', id_pelatihan: result.insertId });
    });
});

//Mengedit Jadwal Pelatihan
router.put('/pelatihan/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const { nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan } = req.body;

    const query = `
    UPDATE data_pelatihan 
    SET 
      nama_penyelenggara = ?, 
      nama_kegiatan = ?, 
      tanggal_mulai = ?, 
      tanggal_selesai = ?, 
      deskripsi_kegiatan = ? 
    WHERE id_pelatihan = ?`;

    db.query(query, [nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pelatihan not found' });
        }
        res.json({ message: 'Pelatihan updated successfully' });
    });
});

//Menghapus Jadwal Pelatihan
router.delete('/pelatihan/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const query = `DELETE FROM data_pelatihan WHERE id_pelatihan = ?`;
    db.query(query, [id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pelatihan not found' });
        }
        res.json({ message: 'Pelatihan deleted successfully' });
    });
});

// Mengubah status pelatihan
router.put('/pelatihan/status/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const { status } = req.body;

    const query = `
    UPDATE data_pelatihan 
    SET 
      status = ? 
    WHERE id_pelatihan = ?`;

    db.query(query, [status, id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pelatihan not found' });
        }
        res.json({ message: 'Status updated successfully' });
    });
});


//USER
//Menampilkan jadwal pelatihan berdasarkan id pegawai
router.get('/jadwalpelatihan/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    console.log("GET /api/data_pelatihan/pelatihan/:id_pegawai");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        pel.id_pelatihan,
        pel.id_pegawai,
        pel.nama_penyelenggara,
        pel.nama_kegiatan,
        pel.tanggal_mulai,
        pel.tanggal_selesai,
        pel.deskripsi_kegiatan,
        pel.status,
        pel.bukti_pelaksanaan,
        pel.sertifikat
    FROM 
        data_pelatihan pel
    JOIN 
        data_pegawai p ON pel.id_pegawai = p.id_pegawai
    WHERE 
        pel.id_pegawai = ?
    `;
    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

// Menampilkan pelatihan dengan status "Proses" berdasarkan id pegawai
router.get('/pelatihan-proses/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const query = `
    SELECT 
        id_pelatihan, 
        nama_kegiatan,
        nama_penyelenggara,
        tanggal_mulai,
        tanggal_selesai
    FROM 
        data_pelatihan 
    WHERE 
        id_pegawai = ? AND status = 'Proses'
    `;
    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Mengupload bukti pelaksanaan pada pelatihan dengan status "Proses"
router.post('/upload-bukti/:id_pelatihan', upload.single('bukti_pelaksanaan'), (req, res) => {
    const { id_pelatihan } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileBuffer = file.buffer;

    const query = 'UPDATE data_pelatihan SET bukti_pelaksanaan = ?, status = ? WHERE id_pelatihan = ? AND status = ?';
    db.query(query, [fileBuffer, 'Selesai', id_pelatihan, 'Proses'], (err, result) => {
        if (err) {
            console.error('Error uploading file to the database:', err);
            return res.status(500).json({ message: 'Error uploading file' });
        }
        res.status(200).json({ message: 'Bukti pelaksanaan uploaded successfully' });
    });
});


export default router;
