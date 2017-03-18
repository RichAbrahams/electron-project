import { b64Authorization, refreshUrl } from '../../keys';
import { refreshTokenSuccess, refreshTokenError } from '../containers/NavBar/actions';
import fetcher from './fetcher';

export default async function getRefreshedToken(messageEvent, action) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${b64Authorization}`
      },
      body: 'grant_type=refresh_token'
      + `&refresh_token=${encodeURIComponent(action.payload)}`
    };
    const tokens = await fetcher(refreshUrl, options);
    messageEvent
      .sender
      .send('messageFromMain', refreshTokenSuccess(tokens));
  } catch (err) {
    messageEvent
      .sender
      .send('messageFromMain', refreshTokenError(err));
  }
}
