import bcrypt from 'bcryptjs';
import db from './db.js'; 

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
};

const createAdmin = async () => {
    const email = 'admin@admin.com';
    const plainPassword = 'admin123';
    const hashedPassword = await hashPassword(plainPassword);
    const role = 'admin';

    const query = 'INSERT INTO admins (email, password, role) VALUES (?, ?, ?)';

    db.query(query, [email, hashedPassword, role], (err, results) => {
        if (err) {
            console.error('Error inserting admin:', err);
        } else {
            console.log('Admin created successfully');
        }
    });
};

const createUser = async () => {
    const email = 'user@user.com';
    const plainPassword = 'user123';
    const hashedPassword = await hashPassword(plainPassword);
    const role = 'user';

    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';

    db.query(query, [email, hashedPassword, role], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
        } else {
            console.log('User created successfully');
        }
    });
};

createAdmin();
createUser();
