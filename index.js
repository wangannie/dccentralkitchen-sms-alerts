import cors from "cors";
import express from "express";
import config from "./config.js";
import { notifyCustomers } from "./lib/utils/twilioNotifications.js";

// Create Express web app
var app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send(
    "You've reached the Healthy Corners SMS Server. Try sending a request to one of the API endpoints!"
  );
});

app.post("/send_alert", async (req, res) => {
  const secretKey = req.body.key;

  if (secretKey !== process.env.HC_SECRET) {
    res.send(`<h1>Error: usage of this API requires a secret key</h1>
    <p>Please notify someone to help you get access.</p>`);
    return;
  }
  try {
    const customers = await notifyCustomers();
    res.send(
      "Success! Delivery alerts were sent to " + customers + " customer(s)."
    );
  } catch (err) {
    console.error(err);
    res.send(`<h1>Error</h1>
    <p>${err}</p>`);
  }
});

app.listen(config.port, () =>
  console.log("Express server listening on *: " + config.port)
);
