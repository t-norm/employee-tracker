const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'M4st3rH4x0r',
  database: 'businessInfo'
});

module.exports = db;