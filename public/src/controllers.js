angular.module('youtApp')
  .controller('vidList', function($rootScope, $scope, MyService) {

    MyService.getVideos();
    $scope.videos = $rootScope.VideosFactory;
    $scope.echoscope = function() {
      console.log($scope.videos + '  ----$scope.Videos');
      console.log($rootScope.VideosFactory + "  ----$rootScope.VideosFactory");
    }
    $scope.refreshList = function() {
      MyService.getVideos();
      $scope.videos = $rootScope.VideosFactory;
    }
  })
  .controller('downloadVid', function($rootScope, $scope, MyService) {
    $scope.downloadVid = function(vid) {
      MyService.downloadVids($scope.vid);
    }
  })
