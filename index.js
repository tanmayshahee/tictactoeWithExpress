const express = require("express");
const path = require("path");
//const generatePassword = require("password-generator");

const app = express();
const port = "3010";
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/startApp", (req, res) => {
  const count = 5;

  // Generate some passwords
  // const passwords = Array.from(Array(count).keys()).map((i) =>
  //   generatePassword(12, false)
  // );

  // Return them as json
  // res.json(passwords);
  res.send("Api Endpoint Started");
  console.log(`Api endpoint working`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// const port = process.env.PORT || 3010;
app.listen(port);

console.log(`Tic Tac Toe App With Express listening on ${port}`);
