export const postEvent = (event: string) => {
  fetch('/.netlify/functions/post-event', {
    method: 'POST',
    body: JSON.stringify({
      event
    })
  });
};
