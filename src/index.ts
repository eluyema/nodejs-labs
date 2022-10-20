import http, { IncomingMessage, ServerResponse } from 'http';

const port = Number(process.env.PORT || 3000)

const requestListener = function (_: IncomingMessage, res: ServerResponse) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(port);
