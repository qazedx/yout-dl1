var express = require('express'),
  // api     = require('./api'),
  // users   = require('./accounts'),
  app = express();

app
  .use(express.static('./public'))
  // .use(users)
  // .use('/api', api)
  .get('*', function (req, res) {
    // if (!req.user) {
    //     res.redirect('/login');
    // } else {
    res.sendFile('public/main.html', {
      "root": "."
    });
    // }
  })
  .listen(3000);

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
// console.log(getFiles('vid'));


// ws



var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    path: '/vidl',
    port: 3005
  });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send(JSON.stringify(getFiles('public/vid')));
  console.log(22);
});










// var WebSocket = require('ws');
// var ws = new WebSocket('ws://localhost:300/vidl');
// ws.on('open', function open() {
//   ws.send( );
// });
// ws.on('message', function(data, flags) {
//   // flags.binary will be set if a binary data is received.
//   // flags.masked will be set if the data was masked.
// });
