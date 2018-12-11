var http = require('http');
var opn = require('opn');
var fs = require('fs');
var aminoList = require('./AminoList');
var random = require('./unrandomThings');

var time = new Date();

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

  if(req.method == 'POST'){
    switch(req.url){
      case "/sendamino":
        sendAminoPostHandler(req);
        break;
      case "/clearAminos":
        aminoList.clearAminos();
        break;
      case "/uname":
        
      default: break;
    }
  }

  if(req.url.indexOf('css') != -1){
    fs.readFile('public/style.css', function(err, data){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }else{
    fs.readFile('body.html', function(err, data){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.write(' Moon phase: ' + moonPhase.phase(time.getFullYear(), time.getMonth() + 1, time.getDate()));
      res.write(aminoList.get());
      res.end();
    });
  }
}

http.createServer(onRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'});
