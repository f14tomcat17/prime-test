import express from 'express';

import routes from './routes';

const cors = require('cors');
require('dotenv').config({ path: './dist/webapi/.env' });

function app(): express.Express {
  const server = express();

  // TODO CORS currently allows all requests
  server.use(cors())

  server.use('/', routes());

  return server;
}

const port = process.env['PORT'] || 4000;

// Start up the Node server
const server = app();
server.listen(port, () => {
  console.log(`Webapi listening on http://localhost:${port}`);
});
