import { BrowserWindow } from 'electron';
import fetch from 'node-fetch';
// import axios from 'axios';

import url from 'url';
import { authUrl, b64Authorization, ruName } from '../../keys';

function fetchSignInToken(userAuth) {
  const body = `grant_type=authorization_code&code=${encodeURIComponent(userAuth)}&redirect_uri=${ruName}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${b64Authorization}`
    },
    body
  };
  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options).then(res => {
    if (!res.ok) {
      throw res.statusText;
    }
    console.log('fetch returning json');
    return res.json();
  }).catch(err => {
    console.log('fetch throwing');
    throw err;
  });
}

export async function ebaySignInPopUp() {
  return new Promise(async function(resolve, reject) {
    let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false, 'web-security': false });
    authWindow.on('closed', () => {
      authWindow = null;
    });
    authWindow.loadURL(authUrl);
    authWindow.show();
    authWindow
      .webContents
      .on('will-navigate', async (event, newUrl) => {
        const parsedUrl = url.parse(newUrl, true, true);
        if (parsedUrl.pathname === '/authTrue') {
          const query = parsedUrl.query;
          try {
            const signIn = await fetchSignInToken(query.code);
            console.log('async returning json');
            resolve(signIn);
          } catch (err) {
            console.log('async returning error');
            reject(err);
          }
        }
        if (parsedUrl.pathname === '/authFalse') {
          authWindow.close();
          reject('client closed signin window');
        }
      });
  });
}

export function fetchRefreshedToked(token) {
  const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(token)}&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory`;
  const options = {
    method: 'GET',
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
