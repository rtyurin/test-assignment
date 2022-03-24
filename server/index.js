const express = require("express");
const messages = require("./messages");
const app = express();
const cors = require("cors");
const port = 3001;

const allowList = ["http://localhost:3000"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.get("/messages", cors(corsOptionsDelegate), (req, res) => {
  res.send({
    result: messages,
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
