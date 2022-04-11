const express = require("express");
const publishMessage = require("./pub");
const listenForMessages = require("./sub");

listenForMessages();

const app = express();

app.get("/", (req, res) => {
  publishMessage();
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
