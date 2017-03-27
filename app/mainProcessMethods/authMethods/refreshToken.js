import {b64Authorization, urls} from '../../../keys';
import {refreshTokenSuccess, refreshTokenError} from '../../containers/NavBar/actions';
import fetcher from '../fetcher';
import replyToRenderer from '../replyToRenderer';

function buildOptions(payload) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${b64Authorization}`
    },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(payload)}`
  };
}

export default async function getRefreshedToken(messageEvent, action) {
  try {
    const tokens = await fetcher(urls.tokenUrl, buildOptions(action.payload));
    replyToRenderer(messageEvent, refreshTokenSuccess(tokens));
  } catch (err) {
    replyToRenderer(messageEvent, refreshTokenError(err));
  }
}
