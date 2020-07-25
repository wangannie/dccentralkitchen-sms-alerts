import { notifyCustomers } from "./lib/utils/twilioNotifications.js";

(async () => {
  await notifyCustomers();
})();
