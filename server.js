var express = require('express'),
  app = express();

app
  .use(express.static('./public'))
  .get('*', function (req, res) {
    res.sendFile('public/main.html', {
      "root": "."
    });
  }).listen(3000);

// read files
var fs = require('fs');
var ytdl = require('ytdl-core');

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}


// ws

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    path: '/vidl',
    port: 3007
  });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(JSON.stringify(getFiles('public/vid')));
  });
  console.log('connected');
  ws.send(JSON.stringify(getFiles('public/vid')));
});
