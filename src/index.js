const app = require('./config/express')();
const http = require('http').Server(app);

const port = process.env.SERVER_PORT || 3000;

const server = http.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on port 3000!');
});
