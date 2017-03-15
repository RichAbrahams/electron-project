import { BrowserWindow } from 'electron';
import fetch from 'node-fetch';
import url from 'url';
import { authUrl, b64Authorization, ruName } from '../../keys';

function getUserToken(userAuth) {
  const body = `grant_type=authorization_code&code=${encodeURIComponent(userAuth)}&redirect_uri=${ruName}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${b64Authorization}`
    },
    body,
  };
  return fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', options).then((res) => {
    return res.json();
  }).then(res => res);
}

export default async function getAuth() {
  let authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    'node-integration': false,
    'web-security': false
  });

  authWindow.loadURL(authUrl);

  authWindow.show();

  authWindow.webContents.on('will-navigate', async function (event, newUrl) {
    const parsedUrl = url.parse(newUrl, true, true);
    if (parsedUrl.pathname === '/authTrue') {
      const query = parsedUrl.query;
      try {
        const auth = await getUserToken(query.code);
        console.log('finished with', auth);
        authWindow.close();
      } catch (err) {
        console.log('failed', err);
      }
    }
    if (parsedUrl.pathname === '/authFalse') {
      console.log('auth failed');
      authWindow.close();
    }
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });
}

// mrtesty
// _password4475