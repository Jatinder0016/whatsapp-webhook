const express = require("express");
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "my_secret_token";

// VERIFY WEBHOOK
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// RECEIVE MESSAGES & STATUSES
app.post("/webhook", (req, res) => {
  console.log("Incoming Webhook:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// RUN SERVER
app.listen(10000, () => {
  console.log("Webhook server running");
});
