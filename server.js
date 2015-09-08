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
      files_.push("vid/" + files[i]);
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
    if (message.type == "download") {
      console.log('sudd');
    } else if (message.type == "get_customers") {
      var file_list = JSON.stringify(getFiles('public/vid'));
      ws.send(file_list);
      console.log('sent: %s', file_list);
    } else {
      console.log("unknown request");
    }

  });
  console.log('connected');
  require('chokidar').watch('public/vid', {
    ignored: /[\/\\]\./
  }).on('all', function (event, path) {
    console.log(event, path);
    var file_list = JSON.stringify(getFiles('public/vid'));
    ws.send(file_list);
  });

});
