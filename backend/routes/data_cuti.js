import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/cuti', (req, res) => {
    console.log("GET /api/data_cuti/cuti");
    const query = 'SELECT * FROM data_cuti';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

export default router;
