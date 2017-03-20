export default function replyToRenderer(event, response) {
  event
      .sender
      .send('messageFromMain', response);
}
