var express = require('express'),
  app = express();

app
  .use(express.static('./public'))
  .get('*', function(req, res) {
    res.sendFile('public/main.html', {
      "root": "."
    });
  }).listen(3000);

// read files
var fs = require('fs');
var ytdl = require('ytdl-core');
var path = require('path')

var diretoryTreeToObj = function(dir, done) {
  var results = [];

  fs.readdir(dir, function(err, list) {
    if (err)
      return done(err);

    var pending = list.length;

    if (!pending)
      return done(null, {
        name: path.basename(dir),
        type: 'folder',
        children: results
      });

    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, function(err, res) {
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
            path: 'vid/' + path.basename(file, ".json") + '.mp4',
            path_full:dir + '/' + path.basename(file),
            video_id:obj.video_id,
            video_title:obj.title,
            video_author:obj.author,
            video_timestamp: obj.timestamp
            // obj: obj
          });
          if (!--pending)
            done(null, results);
        } else {
          // results.push({
          //   type: 'file',
          //   name: path.basename(file)
          // });
          if (!--pending)
            done(null, results);
        }
      });
    });
  });
};



function downloadVid(ws, url) {
  try {
    ytdl.getInfo(url, function(err, info) {
      if (err) {
        return console.log(err);
      }
      fs.writeFile('public/vid/' + info.video_id + '.json', JSON.stringify(info), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      ytdl(url, {
          filter: function(format) {
            return format.container === 'mp4';
          }
        })
        .pipe(fs.createWriteStream('public/vid/' + info.video_id + '.mp4'));
    })
  } catch (err) {
    console.log(err + "------------------downloadVid");
  }

}

function sendFileTreeOb(ws) {
  diretoryTreeToObj('public/vid', function(err, res) {
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

function deleteVid(vid) {
  console.log(vid + "------deleteVid");
  var vid_file = "public/vid/" + vid + ".mp4";
  var vid_data_file = "public/vid/" + vid + ".json";
  fs.unlinkSync(vid_data_file);
  fs.unlinkSync(vid_file);
}


// add2folder

function add2folder(array, array_path, folder) {
  console.log(array);
  //temp

  for (var i = 0; i < array.length; i++) {
    array[i];
    console.log(array[i]);
    var vid_file = "public/" + array_path[i];
    // var vid_data_file = "public/vid/" + vid + ".json";
    var vid_file_new = "public/vid/" + +folder + "/" + array[i] + +".mp4";
    // var vid_data_file_new = "public/vid/" + vid + ".json";
    fs.rename(vid_file, vid_file_new, function (err) {
                    if (err) throw err;
                    console.log('Renamed complete');
                });
  }
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
    console.log('received: %s', message.type);
    if (message.type == "download") {
      downloadVid(ws, message.url)
      console.log(message.url);
    } else if (message.type == "get_videos") {
      sendFileTreeOb(ws)
    } else if (message.type == "deleteVid") {
      deleteVid(message.vid)
    } else if (message.type == "add2folder") {
      add2folder(message.arr, message.arr_path, message.folder)
    } else {
      console.log("unknown request");
    }

  });
  console.log('connected');
  require('chokidar')
    .watch('public/vid', {
      ignored: /[\/\\]\./
    }).on('all', function(event, path) {
      console.log(event, path);
      // var file_list = JSON.stringify(getFiles('public/vid'));
      // ws.send(file_list);
    })
    .on('add', function(event, path) {
      console.log('on add');
      diretoryTreeToObj('public/vid', function(err, res) {
        if (err)
          console.error(err);

        var message = {
          type: "videos",
          videosArr: res
        }
        message = JSON.stringify(message)
          // ws.send(message);
      });
    })
    .on('change', function(event, path) {
      console.log('on change');
      //var file_list = JSON.stringify(getFiles('public/vid'));
      var message = {
          type: "change"
        }
        //  ws.send(JSON.stringify(message));
    });



});
