import express from 'express';
import db from '../db.js';

const router = express.Router();

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

export default router;
