// index.js
import express from "express";
import line from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret:      process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

// 公式 SDK の middleware が署名検証を代行
app.post(
  "/webhook",
  line.middleware(config),
  async (req, res) => {
    try {
      await Promise.all(req.body.events.map(handleEvent));
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
);

async function handleEvent(event) {
  // 受け取るのはテキストだけ、と割り切るシンプル実装
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,   // エコー
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port}`));
