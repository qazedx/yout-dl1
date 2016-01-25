angular.module('youtApp')
  .controller('vidList', function($rootScope, $scope, MyService) {

    setTimeout(function() {
      MyService.getVideos();
      $scope.videos = $rootScope.VideosFactory;
    }, 100)

    $scope.echoscope = function() {
      console.log($scope.videos + '  ----$scope.Videos');
      console.log($rootScope.VideosFactory + "  ----$rootScope.VideosFactory");
    }
    $scope.refreshList = function() {
      MyService.getVideos();
      $scope.videos = $rootScope.VideosFactory;
    }
    $scope.deleteVid = function(vid) {
      MyService.deleteVid(vid);
    }
    $scope.predicate = 'obj.timestamp';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
    $scope.add2folder = function() {
      console.log($scope.vid_add_arr);
      console.log($scope.folderName);
      MyService.add2folder($scope.vid_add_arr,$scope.vid_path_add_arr, $scope.folderName);
    }
  })
  .controller('downloadVid', function($rootScope, $scope, MyService) {
    $scope.downloadVid = function(vid) {
      MyService.downloadVids($scope.vid);
    }
  })
  .controller('live-playlist', function($rootScope, $scope, MyService) {

    console.log("live-playlist test controller");


  })
