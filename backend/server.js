import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data_pegawai.js';
import gajiRoutes from './routes/data_gaji.js';
import presensiRoutes from './routes/data_presensi.js';
import cutiRoutes from './routes/data_cuti.js';
import pelatihanRoutes from './routes/data_pelatihan.js';
import roleDataRoutes from './routes/data_role.js';
import notifikasiRoutes from './routes/data_notifikasi.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Konfigurasi CORS
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization, X-Requested-With', 'Origin', 'Accept']
}));

app.use(express.json({ limit: '20mb' }));

// Rute API
app.use('/api/auth', authRoutes);
app.use('/api/data_pegawai', dataRoutes);
app.use('/api/data_gaji', gajiRoutes);
app.use('/api/data_presensi', presensiRoutes);
app.use('/api/data_cuti', cutiRoutes);
app.use('/api/data_pelatihan', pelatihanRoutes);
app.use('/api/data_role', roleDataRoutes);
app.use('/api/data_notifikasi', notifikasiRoutes);

// Melayani file statis frontend
app.use(express.static(path.join(__dirname, '../public')));

// Semua rute lainnya diarahkan ke file index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});