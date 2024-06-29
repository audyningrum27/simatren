import express from 'express';
import db from '../db.js';
import moment from 'moment-timezone';

const router = express.Router();

const getStatus = (tanggal_mulai, tanggal_selesai) => {
    const now = moment().tz('Asia/Jakarta');
    if (now.isBefore(moment(tanggal_mulai))) {
        return 'Belum Dimulai';
    } else if (now.isAfter(moment(tanggal_mulai)) && now.isBefore(moment(tanggal_selesai))) {
        return 'Proses';
    } else {
        return 'Selesai';
    }
};

// router.get('/jadwalpelatihan', (req, res) => {
//     const query = 'SELECT * FROM jadwal_pelatihan';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }

//         const formattedResults = results.map(item => ({
//             ...item,
//             status: getStatus(item.tanggal_mulai, item.tanggal_selesai)
//         }));

//         return res.json(formattedResults);
//     });
// });

router.get('/jadwalpelatihan', (req, res) => {
    const currentYear = new Date().getFullYear();
    const query = `SELECT * FROM jadwal_pelatihan WHERE YEAR(tanggal_mulai) = ?`;
    db.query(query, [currentYear], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        return res.json(results);
    });
});


router.get('/jadwalpelatihan/:id_pelatihan', (req, res) => {
    const { id_pelatihan } = req.params;
    const sql = `SELECT * FROM jadwal_pelatihan WHERE id_pelatihan = ?`;
    db.query(sql, [id_pelatihan], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const formattedResult = {
                    ...result[0],
                    status: getStatus(result[0].tanggal_mulai, result[0].tanggal_selesai)
                };
                res.json(formattedResult);
            } else {
                res.status(404).json({ error: 'Pelatihan not found' });
            }
        }
    });
});

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


export default router;
