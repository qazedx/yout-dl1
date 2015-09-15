angular.module('youtApp')
  .factory('MyService', ['$q', '$rootScope', function ($q, $rootScope) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://localhost:3007/vidl");

    ws.onopen = function () {
      console.log("Socket has been opened!");
    };

    ws.onmessage = function (message) {
      listener(JSON.parse(message.data));
      // Service.getVideos
    };
    ws.onclose = function () {

};

    function sendRequest(request) {
      var defer = $q.defer();
      var callbackId = getCallbackId();
      callbacks[callbackId] = {
        time: new Date(),
        cb: defer
      };
      request.callback_id = callbackId;
      console.log('Sending request', request);
      setTimeout(function () {
        ws.send(JSON.stringify(request));
      }, 1)
      return defer.promise;
    }

    function listener(data) {
      var messageObj = data;
      console.log(messageObj.type);
      if (messageObj.type == "change" ){
        $rootScope.loadingVideo = true;
        setTimeout(function(){$rootScope.loadingVideo = true;},1000)
        console.log($rootScope.loadingVideo);
      }else if (messageObj.type == "videos") {
        console.log(messageObj.videosArr);
        $rootScope.VideosFactory = messageObj.videosArr;
      }
      // console.log("Received data from websocket (factory): ", messageObj);

    }
    // This creates a new callback ID for a request
    function getCallbackId() {
      currentCallbackId += 1;
      if (currentCallbackId > 10000) {
        currentCallbackId = 0;
      }
      return currentCallbackId;
    }

    // Define a "getter" for getting customer data
    Service.getVideos = function () {
      var request = {
          type: "get_videos"
        }
        // Storing in a variable for clarity on what sendRequest returns
        // var promise =
      sendRequest(request);
      // console.log(promise);
      // return promise;
    }
    Service.downloadVids = function (vid) {
      var request = {
          type: "download",
          url: vid.url
        }
        // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request);
      console.log(promise);
      // return promise;
    }
    Service.deleteVid = function (vid) {
      var request = {
          type: "deleteVid",
          vid: vid
        }
        // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request);
      console.log(promise);
      // return promise;
    }
    Service.add2folder = function (arr,arr_path, folder) {
      var request = {
          type: "add2folder",
          folder: folder,
          arr: arr,
          arr_path: arr_path
        }
        // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request);
      console.log(promise);
      // return promise;
    }


    return Service;
  }])
