import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/historipelatihan', (req, res) => {
    console.log("GET /api/histori_pelatihan/historipelatihan");
    const query = 'SELECT * FROM histori_pelatihan';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

router.get('/historipelatihan/:id_historipelatihan', (req, res) => {
    const { id_historipelatihan } = req.params;
    const sql = 'SELECT * FROM histori_pelatihan WHERE id_historipelatihan = ?';
    db.query(sql, [id_historipelatihan], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const pelatihan = result[0];
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
                res.status(404).json({ error: 'Histori Pelatihan not found' });
            }
        }
    });
});

export default router;
