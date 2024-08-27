import type { Handler } from '@netlify/functions';

export const handler: Handler = async (req) => {
  if (!req.body) {
    return {
      statusCode: 200
    };
  }

  const { event } = JSON.parse(req.body);

  if (typeof event === 'undefined') {
    return {
      statusCode: 200
    };
  }

  await fetch('https://lukedenton-sqliteanalytics.web.val.run', {
    method: 'POST',
    body: JSON.stringify({
      event
    })
  });

  return {
    statusCode: 200
  };
};
