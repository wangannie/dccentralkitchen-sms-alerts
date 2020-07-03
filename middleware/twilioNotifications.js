import { getCustomers } from "../lib/customerUtils.js";
import { sendSms } from "../twilioClient.js";

function formatMessage(name, favoriteStores) {
  return (
    "Hi" + name + "Your stores: " + favoriteStores + " have gotten deliveries"
  );
}

export const notifyOnError = async function (
  appError,
  request,
  response,
  next
) {
  const contacts = await getCustomers();
  console.log(contacts);

  contacts.forEach(function (contact) {
    var messageToSend = formatMessage(contact.name, contact.favoriteStores);
    sendSms(contact.phoneNumber, messageToSend);
  });
  next(appError);
};

export { notifyOnError as default };
