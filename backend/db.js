import mysql from 'mysql2';

const db = mysql.createConnection({
    /*host: 'localhost',
    user: 'root',
    password: '',
    database: 'simatren'*/

    host: 'backend.simatren.space',
    user: 'rvrqpiyo_admin',
    password: 'B2sm47skKe@YL9Z',
    database: 'rvrqpiyo_simatren'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

export default db;
