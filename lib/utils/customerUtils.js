import moment from "moment";
import { getAllCustomers, getStoresByIds } from "../airtable/request.js";

export const getCustomers = async () => {
  try {
    const cust = await getAllCustomers(
      "AND(NOT({Favorite Stores} = ''), SEARCH('SMS', {Delivery Notifications}))"
    );
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
      // latestDelivery cannot be undefined
      // if undefined, moment will falsely set it to today
      if (
        store.latestDelivery &&
        moment(store.latestDelivery).format("MM/DD/YYYY") ===
          moment().format("MM/DD/YYYY") &&
        !store.doNotDisplay &&
        store.productIds
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
