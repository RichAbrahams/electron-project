import replyToRenderer from '../replyToRenderer';

export default function (event, action, mainWindow) {


  replyToRenderer(event, {
    type: `${action.type}_SUCCESS`,
    payload: []
  });
}

