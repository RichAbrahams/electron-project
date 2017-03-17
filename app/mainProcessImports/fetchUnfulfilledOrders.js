import fetch from 'node-fetch';
import { b64Authorization } from '../../keys';

export default function fetchUnfulfilledOrders() {
  console.log('fetchUnfulfilledOrders');
  // const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(token)}&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory`;
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Authorization: `Basic ${b64Authorization}`
  //   },
  //   body
  // };

  // const url: 'https://api.ebay.com/sell/fulfillment/v1/order?filter=orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D&limit=1000&offset=0';

  // return fetch(url, options)
  // .then(res => {
  //   if (!res.ok) {
  //     throw res.statusText;
  //   }
  //   return res.json();
  // }).catch(err => {
  //   throw err;
  // });

  return { success: true };
}
