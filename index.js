const express = require("express");
const path = require("path");
//const generatePassword = require("password-generator");

const app = express();
var db = require("./db");
var cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/startApp", (req, res) => {
  res.send("Api Endpoint Started");
  console.log(`Api endpoint working`);
});

const port = process.env.PORT || 3010;
app.listen(port);

console.log(`Tic Tac Toe App With Express listening on ${port}`);

app.post("/api/addUser", async (req, res) => {
  console.log(req.body);
  const userInfo = req.body.userInfo;

  db.query(`SELECT * FROM users WHERE id = ${userInfo.id}`, (err, response) => {
    if (err) {
      throw err;
    } else if (!response.length) {
      let userData = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        imageurl: userInfo.imageUrl,
      };

      db.query(`INSERT INTO users SET ?`, userData, function (err, response) {
        if (err) {
          console.log(data2);
          console.log(err);
          throw err;
        } else {
          res.send({ status: 1, msg: "User Added" });
        }
      });
    } else {
      res.send({ status: 0, msg: "User Exists" });
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
