var http = require('http');
var opn = require('opn');
var fs = require('fs');

function onRequest (req, res){
  fs.readFile('body.html', function(err, data){

    switch (req.method){
      case "GET":
        console.log('GET');
        break;
      case "POST":
        console.log('POST');
        break;
      default: break;
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}

http.createServer(onRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'});
