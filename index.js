var http = require('http');
var opn = require('opn');
var fs = require('fs');

function sendAminoPostHandler(req){
  body = '';

  req.on('data', chunk =>{
    body += chunk.toString();
  });

  req.on('end', () =>{
    console.log(body);
  });
}

function onRequest (req, res){
  fs.readFile('body.html', function(err, data){

    if(req.method == 'POST'){
      switch(req.url){
        case "/sendamino":
          sendAminoPostHandler(req);
          break;
        default: break;
      }
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}

http.createServer(onRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'});
