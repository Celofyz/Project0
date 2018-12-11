var http = require('http');
var opn = require('opn');
var fs = require('fs');
var aminoList = require('./AminoList');
var express = require('express');
var app = express();
var path = require('path');
//Tutaj kurna nie wiem.
var publicfolder = path.join(__dirname, 'public');
app.use(express.static('public'));
console.log(publicfolder);


function getPostRequestChunkValue(chunk){
  let chunkstring = chunk.toString();
  let lng = chunkstring.length;

  for(var i = 0; i<lng; i++){
    let chunkcodeat = chunkstring.charCodeAt(i);

    if(chunkcodeat == 61){
      chunkstring = chunkstring.slice(i+1);
      return chunkstring;
    }
  }

  return chunkstring;
}

function sendAminoPostHandler(req){
  req.on('data', chunk =>{
    aminoList.addAmino(getPostRequestChunkValue(chunk.toString()));
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
    res.write(aminoList.get());
    res.end();
  });
}

http.createServer(onRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'});
