import express from 'express';
import db from '../db.js';

const router = express.Router();

// Menampilkan Data Presensi di Admin
router.get('/presensi', (req, res) => {
    console.log("GET /api/data_presensi/presensi");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        pr.id_presensi,
        pr.id_pegawai,
        pr.tanggal_presensi,
        pr.jam_masuk,
        pr.jam_keluar,
        pr.hafalan,
        CONCAT(
        FLOOR(TIMESTAMPDIFF(MINUTE, pr.jam_masuk, pr.jam_keluar) / 60), ' jam ',
        MOD(TIMESTAMPDIFF(MINUTE, pr.jam_masuk, pr.jam_keluar), 60), ' menit'
        ) AS total_jam_kerja
    FROM 
        data_presensi pr
    JOIN 
        data_pegawai p ON pr.id_pegawai = p.id_pegawai
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

//Menampilkan Laporan Kinerja 
router.get('/presensi/laporan_kinerja/:id_presensi', (req, res) => {
    const { id_presensi } = req.params;
    console.log("GET /api/data_presensi/presensi/laporan_kinerja/:id_presensi");
    const query = `
    SELECT 
        hafalan, 
        amalan_baik, 
        kegiatan_rutin, 
        penyelesaian_masalah, 
        inisiatif_proyek 
    FROM 
        data_presensi 
    WHERE 
        id_presensi = ? 
    `;
    db.query(query, [id_presensi], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            console.log('No data found for id_presensi:', id_presensi);
            return res.status(404).json({ message: 'No data found' });
        }
        return res.json(results[0]);
    });
});

// Menghitung Grafik Presensi Pada Dashboard
router.get('/presensi/count', (req, res) => {
    const date = req.query.date;
    let queryPresensi;
    if (date) {
        queryPresensi = 'SELECT COUNT(*) AS presensi_count FROM data_presensi WHERE DATE(tanggal_presensi) = ?';
    } else {
        queryPresensi = 'SELECT COUNT(*) AS presensi_count FROM data_presensi';
    }
    const queryPegawaiAktif = 'SELECT COUNT(*) AS active_count FROM data_pegawai WHERE status_kepegawaian = "aktif"';

    // Mendapatkan jumlah presensi
    db.query(queryPresensi, [date], (errPresensi, resultsPresensi) => {
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

// Endpoint untuk mendapatkan jumlah presensi per tanggal
router.get('/presensi/daily', (req, res) => {
    const query = `
        SELECT 
            DATE(tanggal_presensi) as date, 
            COUNT(*) as Hadir
        FROM data_presensi 
        GROUP BY DATE(tanggal_presensi)
        ORDER BY DATE(tanggal_presensi)`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('Data presensi harian:', results);
        res.json(results);
    });
});

//Menampilkan grafik presensi perbulan berdasarkan id pegawai
router.get('/presensi/daily/:id_pegawai', (req, res) => {
    console.log("GET /api/data_presensi/presensi/daily/:id_pegawai");
    const { id_pegawai } = req.params;
    if (!id_pegawai) {
        return res.status(400).json({ message: 'id_pegawai is required' });
    }

    const query = `
        SELECT 
            DATE(tanggal_presensi) as date, 
            COUNT(*) as Hadir
        FROM data_presensi 
        WHERE id_pegawai = ?
        GROUP BY DATE(tanggal_presensi)
        ORDER BY DATE(tanggal_presensi)`;

    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('Data presensi harian untuk pegawai:', results);
        res.json(results);
    });
});

//Menampilkan Data Presensi Berdasarkan id Pegawai
router.get('/presensi/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    console.log("GET /api/data_presensi/presensi/:id_pegawai");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        pr.id_presensi,
        pr.id_pegawai,
        pr.tanggal_presensi,
        pr.jam_masuk,
        pr.jam_keluar,
        pr.hafalan,
        CONCAT(
        FLOOR(TIMESTAMPDIFF(MINUTE, pr.jam_masuk, pr.jam_keluar) / 60), ' jam ',
        MOD(TIMESTAMPDIFF(MINUTE, pr.jam_masuk, pr.jam_keluar), 60), ' menit'
        ) AS total_jam_kerja
    FROM 
        data_presensi pr
    JOIN 
        data_pegawai p ON pr.id_pegawai = p.id_pegawai
    WHERE 
        pr.id_pegawai = ?
    `;
    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

// Menambahkan data presensi saat pegawai scan QR
router.post('/save-presensi/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    const { type, timestamp } = req.body;

    if (!id_pegawai) {
        return res.status(400).json({ message: 'id_pegawai is required' });
    }

    const datetime = new Date(timestamp);
    const tanggalPresensi = datetime.toISOString().split('T')[0];
    const waktuPresensi = datetime.toTimeString().split(' ')[0];

    let query = '';
    if (type === 'masuk') {
        query = 'INSERT INTO data_presensi (id_pegawai, tanggal_presensi, jam_masuk) VALUES (?, ?, ?)';
        db.query(query, [id_pegawai, tanggalPresensi, waktuPresensi], (err, results) => {
            if (err) {
                console.error('Error inserting presensi masuk:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json({ message: 'Presensi masuk berhasil disimpan' });
        });
    } else if (type === 'keluar') {
        query = 'UPDATE data_presensi SET jam_keluar = ? WHERE id_pegawai = ? AND tanggal_presensi = ? AND jam_keluar IS NULL';
        db.query(query, [waktuPresensi, id_pegawai, tanggalPresensi], (err, results) => {
            if (err) {
                console.error('Error updating presensi keluar:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (results.affectedRows === 0) {
                return res.status(400).json({ message: 'No matching entry found for update' });
            }

            res.json({ message: 'Presensi keluar berhasil disimpan' });
        });
    } else {
        res.status(400).json({ message: 'Invalid presensi type' });
    }
});

//Melengkapi Form Presensi
router.put('/update-presensi/:id_presensi', (req, res) => {
    const { id_presensi } = req.params;
    const { hafalan, amalan_baik, kegiatan_rutin, penyelesaian_masalah, inisiatif_proyek } = req.body;

    const query = `
        UPDATE data_presensi 
        SET 
            hafalan = ?, 
            amalan_baik = ?, 
            kegiatan_rutin = ?, 
            penyelesaian_masalah = ?, 
            inisiatif_proyek = ? 
        WHERE id_presensi = ?
    `;

    db.query(query, [hafalan, amalan_baik, kegiatan_rutin, penyelesaian_masalah, inisiatif_proyek, id_presensi], (err, results) => {
        if (err) {
            console.error('Error updating presensi:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(400).json({ message: 'No matching entry found for update' });
        }

        res.json({ message: 'Presensi updated successfully' });
    });
});

router.get('/presensi/monthly/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    console.log('Fetching data for id_pegawai:', id_pegawai);

    const query = `
        SELECT 
            MONTH(tanggal_presensi) as month,
            SUM(IF(jam_masuk IS NOT NULL, 1, 0)) as Hadir,
            SUM(IF(jam_keluar IS NOT NULL AND jam_masuk IS NULL, 1, 0)) as Cuti
        FROM data_presensi 
        WHERE id_pegawai = ?
        GROUP BY MONTH(tanggal_presensi)
        ORDER BY MONTH(tanggal_presensi)
    `;

    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('Query results:', results);
        res.json(results);
    });
});

export default router;