import { notifyCustomers } from "./middleware/twilioNotifications.js";

(async () => {
  await notifyCustomers();
})();
