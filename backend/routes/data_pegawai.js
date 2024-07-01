import express from 'express';
import db from '../db.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//ADMIN
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
                const pegawai = result[0];
                if (pegawai.foto_profil) {
                    let imageType = 'jpeg'; // Default
                    const buffer = Buffer.from(pegawai.foto_profil, 'base64');
                    if (buffer.slice(0, 4).toString('hex') === '89504e47') {
                        imageType = 'png';
                    }
                    pegawai.foto_profil = {
                        data: buffer.toString('base64'),
                        type: imageType
                    };
                }
                res.json(pegawai);
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

//USER
router.get('/pegawai/profil/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const sql = `SELECT * FROM data_pegawai WHERE id_pegawai = ?`;
    db.query(sql, [id_pegawai], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const profil = result[0];
                if (profil.foto_profil) {
                    let imageType = 'jpeg'; // Default
                    const buffer = Buffer.from(profil.foto_profil, 'base64');
                    if (buffer.slice(0, 4).toString('hex') === '89504e47') {
                        imageType = 'png';
                    }
                    profil.foto_profil = {
                        data: buffer.toString('base64'),
                        type: imageType
                    };
                }
                res.json(profil);
            } else {
                res.status(404).json({ error: 'Profil Pegawai not found' });
            }
        }
    });
});

router.put('/pegawai/profil/:id_pegawai', upload.single('foto_profil'), (req, res) => {
    const { id_pegawai } = req.params;
    const { nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, password, role, status_bpjs, status_kepegawaian, anggota_keluarga, jumlah_tanggungan } = req.body;
    let foto_profil = null;
    if (req.file) {
        foto_profil = req.file.buffer.toString('base64');
    }
    
    const getFotoProfilSql = `SELECT foto_profil FROM data_pegawai WHERE id_pegawai = ?`;
    db.query(getFotoProfilSql, [id_pegawai], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const existingFotoProfil = result[0].foto_profil;
                const finalFotoProfil = foto_profil || existingFotoProfil;

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
                        password = ?,
                        role =  ?,
                        status_bpjs = ?,
                        status_kepegawaian = ?,
                        anggota_keluarga = ?,
                        jumlah_tanggungan = ?,
                        foto_profil = ?
                    WHERE id_pegawai = ?
                `;
                const values = [nama_pegawai, nip, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, email, password, role, status_bpjs, status_kepegawaian, anggota_keluarga, jumlah_tanggungan, finalFotoProfil, id_pegawai];
                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        res.status(500).json({ error: 'Internal server error' });
                    } else {
                        res.json({ message: 'Pegawai updated successfully' });
                    }
                });
            } else {
                res.status(404).json({ error: 'Profil Pegawai not found' });
            }
        }
    });
});


export default router;
