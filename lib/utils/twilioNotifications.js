import moment from "moment";
import { sendSms } from "../../twilioClient.js";
import { getCustomers } from "./customerUtils.js";

function formatMessage(name, favoriteStores) {
  // Construct the string based on how many stores are included
  var storeString = "";
  if (favoriteStores.length === 1) {
    storeString = favoriteStores;
  } else if (favoriteStores.length === 2) {
    storeString = favoriteStores.join(" and ");
  } else {
    const lastStore = favoriteStores.pop();
    storeString = favoriteStores.join(", ") + ", and " + lastStore;
  }

  return (
    "Hi " +
    name +
    ", " +
    storeString +
    " received fresh deliveries from Healthy Corners today!"
  );
}

export const notifyCustomers = async function () {
  console.log("Starting at ", moment().format());
  const customers = (await getCustomers()).filter(
    (customer) => customer.favoriteStores.length > 0
  );
  if (customers.length > 0) {
    console.log("Sending alerts to: ", customers);
  } else {
    console.log("No customers to alert.");
  }
  customers.forEach(function (customer) {
    var messageToSend = formatMessage(customer.name, customer.favoriteStores);
    sendSms(customer.phoneNumber, messageToSend);
  });
  return customers.length;
};
