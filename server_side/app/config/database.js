const mysql = require('mysql');

const IP = 'localhost';

// MySQL Connection
const connection = mysql.createConnection({
    host: IP,
    user: process.env.database_user,
    password: process.env.database_password,
    database: 'authentifi'
  });
  
  connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!\n');
    } else {
    console.log(err);
        console.log('Not connected to MySql.\n');
    }
  });

  module.exports = connection;