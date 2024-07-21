import xlsx from 'xlsx';
import { format } from 'date-fns';
import express from 'express';
import multer from 'multer';
import db from '../db.js';

const router = express.Router();

// Konfigurasi multer untuk menyimpan file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fungsi untuk mengonversi tanggal serial Excel ke objek Date JavaScript
const excelDateToJSDate = (serial) => {
    const excelStartDate = new Date(Date.UTC(1899, 11, 30)); // Tanggal mulai Excel
    const utcDays = serial; // Excel menghitung dari 1900-12-30, jadi kita kurangi 2 hari
    const utcDate = new Date(excelStartDate.getTime() + utcDays * 86400 * 1000); // Mengonversi hari ke milidetik
    return utcDate;
};

//ADMIN
//Menampilkan seluruh data gaji
router.get('/gaji', (req, res) => {
    console.log("GET /api/data_gaji/gaji");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        g.id_gaji,
        g.id_pegawai,
        g.bulan_gaji,
        g.gaji_dasar,
        g.tunjangan,
        g.potongan,
        g.total
    FROM 
        data_gaji g
    JOIN 
        data_pegawai p ON g.id_pegawai = p.id_pegawai
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

//Menambah data gaji
router.post('/gaji', (req, res) => {
    const { id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan } = req.body;

    if (Array.isArray(id_pegawai)) {
        const values = id_pegawai.map(id => [id, bulan_gaji, gaji_dasar, tunjangan, potongan]);
        const query = 'INSERT INTO data_gaji (id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan) VALUES ?';

        db.query(query, [values], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            return res.status(201).json({ message: 'Data Gaji Berhasil Ditambahkan!' });
        });
    } else {
        const query = 'INSERT INTO data_gaji (id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            return res.status(201).json({ message: 'Data Gaji Berhasil Ditambahkan!' });
        });
    }
});


//USER
//Menampilkan data gaji berdasarkan id pegawai
router.get('/gaji/:id_pegawai', (req, res) => {
    const { id_pegawai } = req.params;
    console.log("GET /api/data_gaji/gaji/:id_pegawai");
    const query = `
    SELECT 
        p.nip,
        p.nama_pegawai,
        g.id_gaji,
        g.id_pegawai,
        g.bulan_gaji,
        g.gaji_dasar,
        g.tunjangan,
        g.potongan,
        g.total,
        g.status_gaji
    FROM 
        data_gaji g
    JOIN 
        data_pegawai p ON g.id_pegawai = p.id_pegawai
    WHERE 
        g.id_pegawai = ?
    `;
    db.query(query, [id_pegawai], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        return res.json(results);
    });
});

// ADMIN - POST to import data from Excel
router.post('/import-gaji', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Baca file Excel
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Mengambil sheet pertama
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log('Raw data from Excel:', data);

    // Proses data dan insert ke database
    const queries = data.map(row => {
        const { id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan } = row;

        // Konversi bulan_gaji ke format tanggal yang benar
        let formattedBulanGaji;
        if (bulan_gaji instanceof Date) {
            // Jika bulan_gaji sudah merupakan objek Date
            formattedBulanGaji = format(bulan_gaji, 'yyyy-MM-dd');
        } else if (typeof bulan_gaji === 'number') {
            // Jika bulan_gaji adalah angka serial Excel
            const jsDate = excelDateToJSDate(bulan_gaji);
            formattedBulanGaji = format(jsDate, 'yyyy-MM-dd');
        } else {
            // Jika bulan_gaji adalah string, coba konversi menjadi objek Date
            const parsedDate = new Date(bulan_gaji);
            formattedBulanGaji = format(parsedDate, 'yyyy-MM-dd');
        }

        console.log('Formatted bulan_gaji:', formattedBulanGaji);

        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO data_gaji (id_pegawai, bulan_gaji, gaji_dasar, tunjangan, potongan) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [id_pegawai, formattedBulanGaji, gaji_dasar, tunjangan, potongan], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(queries)
        .then(() => res.status(201).json({ message: 'Data Gaji Berhasil Diimport!' }))
        .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
});

export default router;