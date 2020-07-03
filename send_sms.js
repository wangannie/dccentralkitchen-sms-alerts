// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config({ path: ".env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: "Test message",
    from: "+12022214650",
    to: process.env.TEST_PHONE_NUMBER,
  })
  .then((message) => console.log(message.sid));
