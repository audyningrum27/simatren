import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/presensi', (req, res) => {
    console.log("GET /api/data_presensi/presesnsi");
    const query = 'SELECT * FROM data_presensi';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

export default router;
