const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
const port = 3001;

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "test-assignment";

client.connect();
const db = client.db(dbName);

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

app.get("/messages", cors(corsOptionsDelegate), async (req, res) => {
  const chatId = req.query.chatId;
  const messages = await db.collection("messages");
  const msgs = await messages
    .find({ chatId: parseInt(chatId) })
    .sort({ createdTimestamp: 1 })
    .toArray();

  const users = await db.collection("users");
  const messagesWithAuthor = await Promise.all(
    msgs.map(async (msg) => {
      const author = await users.findOne({ id: msg.authorId });

      return {
        id: msg.id,
        createdTimestamp: msg.createdTimestamp,
        message: msg.message,
        author: author,
      };
    })
  );

  res.send({
    result: {
      messages: messagesWithAuthor,
    },
  });
});

app.post("/message", cors(corsOptionsDelegate), async (req, res) => {
  const requestBody = req.body;

  if (requestBody && requestBody.authorId && requestBody.message) {
    const messages = await db.collection("messages");

    messages.insertOne(requestBody, (err, d) => {
      if (err) {
        res.status(500).send({
          error: err,
        });
      } else {
        res.status(200).json({
          result: "success",
        });
      }
    });
    return;
  }

  res.status(500).json({ error: "do not contain userId or message" });
});

app.options("/message", cors(corsOptionsDelegate));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
