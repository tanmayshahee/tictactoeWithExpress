var mysql = require("mysql");
var dbConfig = require("./db.config");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Developer_0109",
//   database: "tictactoegame",
// });

connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
});

module.exports = connection;
