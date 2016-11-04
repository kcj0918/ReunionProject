var mysql = require('mysql');
var pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'dlaudtnr0',
  database:'skhuDB'
});


module.exports = pool;
