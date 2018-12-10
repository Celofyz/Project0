var http = require('http');
var dt = require('./testModule');
var opn = require('opn');
var fs = require('fs');
var express = require('express');
var app = express();

app.post('/sendamino', function(req, res){
  console.log('post');
  console.log(req);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});

function onRequest (req, res){
  fs.readFile('body.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
  if(req.title !== null) console.log(req);
}

http.createServer(onRequest).listen(80);
opn('http://localhost:8080', {app: 'firefox'});
