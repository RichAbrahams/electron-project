import fetch from 'node-fetch';
import { b64Authorization } from '../../keys';

export default function fetchRefreshedToked(token) {
  const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(token)}&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${b64Authorization}`
    },
    body
  };

  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options)
  .then(res => {
    if (!res.ok) {
      throw res.statusText;
    }
    return res.json();
  }).catch(err => {
    throw err;
  });
}
