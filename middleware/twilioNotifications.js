import { getCustomers } from "../lib/customerUtils.js";
import { sendSms } from "../twilioClient.js";

function formatMessage(name, favoriteStores) {
  return (
    "Hi " +
    name +
    ", your stores: " +
    favoriteStores.join(", ") +
    " received fresh deliveries from Healthy Corners today!"
  );
}

export const notifyOnError = async function (
  appError,
  request,
  response,
  next
) {
  const contacts = await getCustomers();
  console.log("Sending alerts to: ", contacts);
  contacts.forEach(function (contact) {
    var messageToSend = formatMessage(contact.name, contact.favoriteStores);
    sendSms(contact.phoneNumber, messageToSend);
  });
  next(appError);
};

export const notifyCustomers = async function () {
  const contacts = await getCustomers();
  console.log("Sending alerts to: ", contacts);
  contacts.forEach(function (contact) {
    var messageToSend = formatMessage(contact.name, contact.favoriteStores);
    sendSms(contact.phoneNumber, messageToSend);
  });
};

export { notifyOnError as default };
