import { BrowserWindow } from 'electron';
import url from 'url';
import { b64Authorization, keys, urls } from '../../keys';
import { signInSuccess, signInError } from '../containers/NavBar/actions';
import fetcher from './fetcher';
import replyToRenderer from './replyToRenderer';

function createPopUpWindow(mainWindow) {
  let authWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    width: 800,
    height: 600,
    show: false,
    'node-integration': false,
    'web-security': false
  });
  authWindow.on('closed', () => {
    authWindow = null;
  });
  authWindow.loadURL(urls.popupUrl);
  authWindow.show();
  return authWindow;
}

function buildOptions(code) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${b64Authorization}`
    },
    body: `grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${keys.ruName}`
  };
}

async function handleAuthTrue(messageEvent, authWindow, code) {
  try {
    const tokens = await fetcher(urls.tokenUrl, buildOptions(code));
    replyToRenderer(messageEvent, signInSuccess(tokens));
    authWindow.close();
  } catch (err) {
    replyToRenderer(messageEvent, signInError(err));
    authWindow.close();
  }
}

function handleAuthFalse(messageEvent, authWindow) {
  authWindow.close();
  replyToRenderer(messageEvent, signInError());
}

export default function signInPopUp(messageEvent, action, mainWindow) {
  const authWindow = createPopUpWindow(mainWindow);
  authWindow
    .webContents
    .on('will-navigate', (event, response) => {
      const parsedResponse = url.parse(response, true, true);
      if (parsedResponse.pathname === '/authTrue') {
        handleAuthTrue(messageEvent, authWindow, parsedResponse.query.code);
      }
      if (parsedResponse.pathname === '/authFalse') {
        handleAuthFalse(messageEvent, authWindow);
      }
    });
}
