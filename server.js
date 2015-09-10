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
var path = require('path')

var diretoryTreeToObj = function (dir, done) {
  var results = [];

  fs.readdir(dir, function (err, list) {
    if (err)
      return done(err);

    var pending = list.length;

    if (!pending)
      return done(null, {
        name: path.basename(dir),
        type: 'folder',
        children: results
      });

    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, function (err, res) {
            results.push({
              name: path.basename(file),
              type: 'folder',
              children: res
            });
            if (!--pending)
              done(null, results);
          });
        } else if (path.extname(file) == ".json") {
          var file_name = dir + '/' + path.basename(file)
          var obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));
          results.push({
            type: 'file',
            name: path.basename(file),
            path: 'vid/'+path.basename(file, ".json")+'.mp4',
            obj: obj
          });
          if (!--pending)
            done(null, results);
        } else {
          results.push({
            type: 'file',
            name: path.basename(file)
          });
          if (!--pending)
            done(null, results);
        }
      });
    });
  });
};

function getFiles(dir, files_) {
  // files_ = files_ || [];
  // var files = fs.readdirSync(dir);
  // for (var i in files) {
  //   var name = dir + '/' + files[i];
  //   if (fs.statSync(name).isDirectory()) {
  //     getFiles(name, files_);
  //   } else {
  //     if (path.extname(files[i]) == ".mp4")
  //       files_.push("vid/" + files[i]);
  //   }
  // }
  //
  //
  //
  // var files =
  // console.log(files + '--------------------------files');
  // return files;
}


function downloadVid(ws, url) {

  ytdl.getInfo(url, function (err, info) {
    if (err) {
      return console.log(err);
    }
    fs.writeFile('public/vid/' + info.author + '_' + info.title + '.json', JSON.stringify(info), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    ytdl(url, {
        filter: function (format) {
          return format.container === 'mp4';
        }
      })
      .pipe(fs.createWriteStream('public/vid/' + info.author + '_' + info.title + '.mp4'));
  })
}

function sendFileTreeOb(ws) {
  diretoryTreeToObj('public/vid', function (err, res) {
    if (err)
      console.error(err);

    var message = {
      type: "videos",
      videosArr: res
    }
    message = JSON.stringify(message)
    ws.send(message);
  });
}

// ws

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    path: '/vidl',
    port: 3007
  });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var message = JSON.parse(message)
    console.log('received: %s', message);
    if (message.type == "download") {
      downloadVid(ws, message.url)
      console.log(message.url);
    } else if (message.type == "get_videos") {
      sendFileTreeOb(ws)
    } else {
      console.log("unknown request");
    }

  });
  console.log('connected');
  require('chokidar')
    .watch('public/vid', {
      ignored: /[\/\\]\./
    }).on('all', function (event, path) {
      console.log(event, path);
      // var file_list = JSON.stringify(getFiles('public/vid'));
      // ws.send(file_list);
    })
    .on('add', function (event, path) {
      console.log('on add');
      diretoryTreeToObj('public/vid', function (err, res) {
        if (err)
          console.error(err);

        var message = {
          type: "videos",
          videosArr: res
        }
        message = JSON.stringify(message)
        ws.send(message);
      });
    })
    .on('change', function (event, path) {
      console.log('on change');
      //var file_list = JSON.stringify(getFiles('public/vid'));
      var message = {
        type: "change"
      }
      ws.send(JSON.stringify(message));
    });



});
