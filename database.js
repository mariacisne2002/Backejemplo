const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'perlamaria.2000',
  database: 'apartamentosproyecto',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('db is connected');
    }
  });
  
  module.exports = mysqlConnection;