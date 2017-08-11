const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
  console.log('request received', req.url);

  if (req.url === '/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('ok');
  } else {
    setTimeout(() => {
      console.log('respond to the client');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('response\n');
    }, process.env.TIMEOUT || 60000);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGTERM', function () {
  console.log('SIGTERM received');
  console.log('stop after 10 seconds')

  setTimeout(() => {
    server.close(function () {
      process.exit(0);
    });
  }, 10000);
});
