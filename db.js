var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Developer_0109",
  database: "tictactoegame",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
});

module.exports = connection;
