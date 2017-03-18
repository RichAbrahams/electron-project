import fetch from 'node-fetch';

function executeFetch(url, options) {
  return fetch(url, options).then(res => {
    if (!res.ok) {
      throw res.statusText;
    }
    return res.json();
  }).catch(err => {
    throw err;
  });
}

export default function retryFetch(url, options) {
  return new Promise((resolve, reject) => {
    function makeThreeAttempts(attempts = 0) {
      const timer = new Promise((res, rej) => setTimeout(rej, 3000, 'Server did not respond'));
      const server = executeFetch(url, options);
      Promise.race([timer, server])
      .then(res => resolve(res))
      .catch(err => {
        console.log(err);
        if (err === 'Server did not respond' && attempts < 3) {
          console.log('failed reponse', attempts);
          makeThreeAttempts(attempts + 1);
        } else {
          reject(err);
        }
      });
    }
    makeThreeAttempts();
  });
}
