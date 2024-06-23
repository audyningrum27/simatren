import express from 'express';
import db from '../db.js';

const router = express.Router();

// Data Pegawai di Admin
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

// Dashboard
router.get('/presensi/count', (req, res) => {
    const queryPresensi = 'SELECT COUNT(*) AS presensi_count FROM data_presensi';
    const queryPegawaiAktif = 'SELECT COUNT(*) AS active_count FROM data_pegawai WHERE status_kepegawaian = "aktif"';

    // Mendapatkan jumlah presensi
    db.query(queryPresensi, (errPresensi, resultsPresensi) => {
        if (errPresensi) {
            console.error('Error executing presensi query:', errPresensi);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        const presensiCount = resultsPresensi[0].presensi_count;

        // Mendapatkan jumlah pegawai aktif
        db.query(queryPegawaiAktif, (errPegawai, resultsPegawai) => {
            if (errPegawai) {
                console.error('Error executing pegawai query:', errPegawai);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            const activeCount = resultsPegawai[0].active_count;

            const presensiPercentage = (presensiCount / activeCount) * 100;

            let formattedPercentage;
            if (Number.isInteger(presensiPercentage)) {
            formattedPercentage = presensiPercentage.toFixed(0);
            } else {
            formattedPercentage = presensiPercentage.toFixed(2);
            }
            
            const responseData = {
            presensi_count: presensiCount,
            total_active_pegawai: activeCount,
            presensi_percentage: formattedPercentage,
            };

            res.json(responseData);
        });
    });
});

// // Endpoint untuk mendapatkan jumlah presensi per tanggal
// router.get('/presensi/daily', (req, res) => {
//     const query = `
//         SELECT 
//             DATE(tanggal_presensi) as date, 
//             COUNT(*) as Hadir
//         FROM data_presensi 
//         GROUP BY DATE(tanggal_presensi)
//         ORDER BY DATE(tanggal_presensi)`;

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         res.json(results);
//     });
// });

router.get('/presensi/dates', (req, res) => {
    const query = `
        SELECT DISTINCT DATE_FORMAT(tanggal_presensi, '%Y-%m-%d') AS date
        FROM data_presensi
        ORDER BY date;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});


export default router;
