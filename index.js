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

/*Metoda obcina znak zapytania z konca linku
 *znak zapytania jest dodawany do getów przez chromium
 *przez niego serwer zle odbiera geta*/
function urlFixer(url){
  url.ParseS
  if(url.slice(-1) == '?'){
    var urlLength = String(url).length - 1;
    console.log(urlLength);
    return url.substr(0, urlLength);
  }
  return url;
}

function onRequest (req, res){

  /*defaultowe*/
  var cssPath = 'public/style.css';
  var htmlPath = 'body.html';

  var requestUrl = String(urlFixer(req.url));
  console.log(requestUrl);

  if(req.method == 'POST'){
    switch(requestUrl){
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
    switch(requestUrl){
      case "/getrandomamino":
        console.log('suck');
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
    switch(requestUrl){
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
