import { BrowserWindow } from 'electron';
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
    body
  };
  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options).then(res => {
    if (!res.ok) {
      throw res.statusText;
    }
    return res.json();
  }).catch(err => {
    throw err;
  });
}

export default async function ebaySignInPopUp() {
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
            authWindow.close();
            resolve(signIn);
          } catch (err) {
            authWindow.close();
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
