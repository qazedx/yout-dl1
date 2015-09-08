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
      console.log("Received data from websocket (factory): ", messageObj);
      $rootScope.customersFactory = messageObj;
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
    Service.getCustomers = function () {
      var request = {
          type: "get_customers"
        }
        // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request);
      console.log(promise);
      return promise;
    }
    Service.downloadVids = function () {
      var request = {
          type: "download"
        }
        // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request);
      console.log(promise);
      return promise;
    }

    return Service;
  }])
