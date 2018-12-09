var http = require('http');
var dt = require('./testModule');
var opn = require('opn');

function onRequest (req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Current Time and Date: " + dt.myDateTime())
  res.end();
}

http.createServer(onRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'})
