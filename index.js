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

function getRandomAmino(){
  random.randomTitle(aminoList.getList());
}

function onRequest (req, res){

  /*defaultowe*/
  var cssPath = 'public/style.css';
  var htmlPath = 'body.html';

  if(req.method == 'POST'){
    switch(req.url){
      case "/sendamino":
        sendAminoPostHandler(req);
        htmlPath = 'body.html'
        break;
      case "/clearAminos":
        aminoList.clearAminos();
        htmlPath = 'body.html'
        break;
      case "/inputname":
        console.log('jakies imie dotarlo');
        htmlPath = 'body.html'
        break;
      default: break;
    }
  }else if(req.method == 'GET'){
    switch(req.url){
      case "/getrandomamino":
        getRandomAmino();
        htmlPath = 'wynik.html'
        break;
      default:
        htmlPath = 'body.html'
        break;
    }
  }

  if(req.url.indexOf('css') != -1){
    fs.readFile(cssPath, function(err, data){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }else{
    switch(req.url){
      case "/getrandomamino":
        fs.readFile(htmlPath, function(err, data){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.write(random.randomTitle(aminoList.getList()));
          //res.write(random.sin(time.getMonth(), time.getDate())); nie działa. :/
          res.end();
        });
          break;
      default:
        fs.readFile(htmlPath, function(err, data){
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.write(aminoList.get());
          res.end();
        });
          break;
    }

  }
}

http.createServer(onRequest).listen(8080);
opn('http://localhost:8080', {app: 'firefox'});
