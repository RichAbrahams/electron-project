import { BrowserWindow } from 'electron';
// import fetch from 'isomorphic-fetch';
import fetch from 'node-fetch';

import url from 'url';
import { authUrl, b64Authorization, ruName } from '../../keys';

function getSignInToken(userAuth) {
  const body = `grant_type=authorization_code&code=${encodeURIComponent(userAuth)}&redirect_uri=${ruName}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${b64Authorization}`
    },
    body,
  };
  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options)
    .then((res) => res.json())
    .then(res => res)
    .catch(err => err);
}

export async function ebaySignInPopUp() {
  return new Promise(async function (resolve, reject) {
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
    authWindow.webContents.on('will-navigate', async function (event, newUrl) {
      const parsedUrl = url.parse(newUrl, true, true);

      if (parsedUrl.pathname === '/authTrue') {
        const query = parsedUrl.query;
        try {
          const authTokens = await getSignInToken(query.code);
          resolve({ success: authTokens });
          authWindow.close();
        } catch (err) {
          reject(err);
        }
      }

      if (parsedUrl.pathname === '/authFalse') {
        reject('user closed signin window');
        authWindow.close();
      }
    });
  });
}
