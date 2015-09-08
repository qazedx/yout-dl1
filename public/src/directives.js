angular.module('youtApp')
  .directive('dlField', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/dl-field.html',
      replace: false,
      link: function ($scope, element, attr) {


      }
    };
  })
  .directive('list', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/list.html',
      replace: false,
      link: function ($scope, element, attr) {
        // var WebSocket = require('ws');
        // var ws = new WebSocket('ws://localhost:3005/vidl');
        // ws.onopen = function () {
        //   console.log("Socket has been opened!");
        // };
        //
        // ws.onmessage = function (message) {
        //   listener(JSON.parse(message.data));
        //   $scope.contacts = JSON.parse(message.data);
        //
        // };
        $scope.contacts = ['ss','ff'];
          setTimeout(function(){
        console.log($scope.customers+'kkkkkkkkk');
        },1000)
        //getFiles('vid/video')
        //
        // function sendRequest(request) {
        //   var defer = $q.defer();
        //   var callbackId = getCallbackId();
        //   callbacks[callbackId] = {
        //     time: new Date(),
        //     cb: defer
        //   };
        //   request.callback_id = callbackId;
        //   console.log('Sending request', request);
        //   ws.send(JSON.stringify(request));
        //   return defer.promise;
        // }
        //
        // function listener(data) {
        //   var messageObj = data;
        //   console.log("Received data from websocket: ", messageObj);
        //   // If an object exists with callback_id in our callbacks object, resolve it
        //   // if (callbacks.hasOwnProperty(messageObj.callback_id)) {
        //   //   console.log(callbacks[messageObj.callback_id]);
        //   //   $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
        //   //   delete callbacks[messageObj.callbackID];
        //   // }
        // }

      }
    };
  })
