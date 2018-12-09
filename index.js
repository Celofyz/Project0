var http = require('http');
var dt = require('./testModule');
var opn = require('opn');
var fs = require('fs');

var i = 0;


// function onRequest (req, res){
//   fs.readFile('body.html', function(err, data){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// }

function iterRequest (req, res){
  i++;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(i.toString());
  res.end();
}

http.createServer(iterRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'})
