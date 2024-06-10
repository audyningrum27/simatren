import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simatren'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

export default db;
