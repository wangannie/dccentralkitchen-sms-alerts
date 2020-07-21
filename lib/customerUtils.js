import moment from "moment";
import { getAllCustomers, getStoresByIds } from "./airtable/request.js";
export const getCustomers = async () => {
  try {
    const cust = await getAllCustomers(
      "AND(NOT({Favorite Stores} = ''), {Notifications})"
    );
    let contactList = [];
    return Promise.all(
      cust.map(async (customer) => {
        return await getFavoriteStoreNames(customer);
      })
    );
  } catch (err) {
    console.error(err);
  }
};

const getFavoriteStoreNames = async (cust) => {
  try {
    const stores = await getStoresByIds(cust.favoriteStoreIds);

    const storeNames = [];
    stores.forEach((store) => {
      if (
        moment(store.latestDelivery).format("MM/DD/YYYY") ===
        moment().format("MM/DD/YYYY")
      ) {
        storeNames.push(store.storeName);
      }
    });
    return {
      name: cust.name,
      favoriteStores: storeNames,
      phoneNumber: cust.phoneNumber,
    };
  } catch (err) {
    console.error(err);
  }
};
