import http from 'http';

type Options = {
  hostname: string;
  method: string;
  path: string;
};

const get = (options: Options) =>
  new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.on('data', (data) => {
        let body = data.toString('utf8');
        body = JSON.stringify(JSON.parse(body));
        return resolve(body);
      });
    });

    req.on('error', (error) => {
      console.error(error);
      return reject(error);
    });

    req.end();
  });

export const handler = async () => {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    method: 'GET',
    path: '/todos/1',
  };

  const result = await get(options);
  const response = {
    statusCode: 200,
    body: result,
  };

  return response;
};
