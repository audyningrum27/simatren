import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

// Endpoint login untuk user dan admin
router.post('/login', (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    let query = '';
    let queryParams = [];
    if (role === 'admin') {
        query = 'SELECT * FROM admins WHERE email = ?';
        queryParams = [email];
    } else {
        query = 'SELECT * FROM users WHERE email = ? AND role = ?';
        queryParams = [email, role];
    }

    db.query(query, queryParams, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or role' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });

            return res.json({ token });
        });
    });
});

export default router;
