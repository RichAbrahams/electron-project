import { BrowserWindow } from 'electron';
// import fetch from 'isomorphic-fetch';
import fetch from 'node-fetch';

import url from 'url';
import { authUrl, b64Authorization, ruName } from '../../keys';

function fetchSignInToken(userAuth) {
  const body = `grant_type=authorization_code&code=${encodeURIComponent(userAuth)}&redirect_uri=${ruName}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${b64Authorization}`
    },
    body,
  };
  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options)
    .then((res) => res.json())
    .then(res => res)
    .catch(err => err);
}

export async function ebaySignInPopUp() {
  return new Promise(async (resolve, reject) => {
    console.log('ebaySignInPopUp start');
    let authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      'node-integration': false,
      'web-security': false
    });

    authWindow.on('closed', () => {
      authWindow = null;
    });

    authWindow.loadURL(authUrl);

    authWindow.show();
    authWindow.webContents.on('will-navigate', async (event, newUrl) => {
      const parsedUrl = url.parse(newUrl, true, true);

      if (parsedUrl.pathname === '/authTrue') {
        const query = parsedUrl.query;
        try {
          const authTokens = await fetchSignInToken(query.code);
          console.log('authTokens', authTokens);
          if (authTokens.error) {
            throw (authTokens);
          }
          resolve(authTokens);
          authWindow.close();
        } catch (err) {
          console.log('catch getSignInToken', err);
          reject(err);
          authWindow.close();
        }
      }

      if (parsedUrl.pathname === '/authFalse') {
        reject('client closed signin window');
        authWindow.close();
      }
    });
  });
}

function fetchRefreshedToked(token) {
  const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(token)}&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.account%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${b64Authorization}`
    },
    body,
  };
  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => err);
}

export function refreshToken(token) {
  return new Promise(async function(resolve, reject) {
    try {
      console.log('refreshToken prom', token);
      const refreshedToken = await fetchRefreshedToked(token);
      console.log('refreshToken', refreshedToken);
      if (refreshedToken.error) {
        console.log('refreshedToken.error');
        throw (refreshedToken);
      }
      resolve(refreshedToken);
    } catch (err) {
      console.log('catch fetchRefreshedToked', err);
      reject(err);
    }
  });
}
