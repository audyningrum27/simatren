import express from 'express';
import db from '../db.js';
import moment from 'moment-timezone';

const router = express.Router();

// Function to get status
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

// Endpoint to add jadwal pelatihan
router.post('/jadwalpelatihan', (req, res) => {
  const { nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan } = req.body;
  const status = getStatus(tanggal_mulai, tanggal_selesai);

  const query = `INSERT INTO jadwal_pelatihan (nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, status) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan, status], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Jadwal Pelatihan created successfully', id_pelatihan: result.insertId });
  });
});

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

router.put('/jadwalpelatihan/:id_pelatihan', (req, res) => {
  const { id_pelatihan } = req.params;
  const { nama_penyelenggara, nama_kegiatan, tanggal_mulai, tanggal_selesai, deskripsi_kegiatan } = req.body;

  const query = `
    UPDATE jadwal_pelatihan 
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

router.delete('/jadwalpelatihan/:id_pelatihan', (req, res) => {
  const { id_pelatihan } = req.params;
  const query = `DELETE FROM jadwal_pelatihan WHERE id_pelatihan = ?`;
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
