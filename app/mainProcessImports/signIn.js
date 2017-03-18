import {BrowserWindow} from 'electron';
import url from 'url';
import {popUpSignInUrl, signInUrl, b64Authorization, keys} from '../../keys';
import {signInSuccess, signInError} from '../containers/NavBar/actions';
import fetcher from './fetcher';

function createPopUpWindow(mainWindow) {
  let authWindow = new BrowserWindow({ parent: mainWindow, modal: true, width: 800, height: 600, show: false, 'node-integration': false, 'web-security': false });
  authWindow.on('closed', () => {
    authWindow = null;
  });
  authWindow.loadURL(popUpSignInUrl);
  authWindow.show();
  return authWindow;
}

async function handleAuthTrue(messageEvent, authWindow, code) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${b64Authorization}`
      },
      body: `grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${keys.ruName}`
    };
    const tokens = await fetcher(signInUrl, options);
    messageEvent
      .sender
      .send('messageFromMain', signInSuccess(tokens));
    authWindow.close();
  } catch (err) {
    messageEvent
      .sender
      .send('messageFromMain', signInError(err));
    authWindow.close();
  }
}

function handleAuthFalse(messageEvent, authWindow) {
  authWindow.close();
  messageEvent
      .sender
      .send('messageFromMain', signInError());
}

export default function signInPopUp(messageEvent, action, mainWindow) {
  const authWindow = createPopUpWindow(mainWindow);
  authWindow
    .webContents
    .on('will-navigate', (event, response) => {
      const parsedResponse = url.parse(response, true, true);
      console.log(parsedResponse.pathname);
      if (parsedResponse.pathname === '/authTrue') {
        handleAuthTrue(messageEvent, authWindow, parsedResponse.query.code);
      }
      if (parsedResponse.pathname === '/authFalse') {
        console.log('client declined auth');
        handleAuthFalse(messageEvent, authWindow);
      }
    });
}
