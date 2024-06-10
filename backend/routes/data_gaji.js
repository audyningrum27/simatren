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

export default router;
