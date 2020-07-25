// Basic functionality to send a single SMS test message

import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config({ path: ".env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: "Test message",
    from: process.env.TWILIO_NUMBER,
    to: process.env.TEST_PHONE_NUMBER,
  })
  .then((message) => console.log(message.sid));
