import twilio from "twilio";
import config from "./config.js";

export const sendSms = function (to, message) {
  var client = twilio(config.accountSid, config.authToken);
  // console.log(client.api.messages.create())
  return client.api.messages
    .create({
      body: message,
      to: to,
      from: config.sendingNumber,
    })
    .then(function (data) {
      console.log("Customers notified");
    })
    .catch(function (err) {
      console.error("Could not notify customer(s)");
      console.error(err);
    });
};
