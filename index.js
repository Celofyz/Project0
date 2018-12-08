var http = require('http');
var dt = require('./testModule');

http.createServer(function (req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Current Time and Date: " + dt.myDateTime())
  res.end();
}).listen(8080);
