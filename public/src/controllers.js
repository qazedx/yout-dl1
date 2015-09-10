angular.module('youtApp')
  .controller('vidList', function ($rootScope, $scope, MyService) {

    setTimeout(function () {
      MyService.getVideos();
      $scope.videos = $rootScope.VideosFactory;
    }, 100)

    $scope.echoscope = function () {
      console.log($scope.videos + '  ----$scope.Videos');
      console.log($rootScope.VideosFactory + "  ----$rootScope.VideosFactory");
    }
    $scope.refreshList = function () {
      MyService.getVideos();
      $scope.videos = $rootScope.VideosFactory;
      console.log($scope.videos);
    }
  })
  .controller('downloadVid', function ($rootScope, $scope, MyService) {
    $scope.downloadVid = function (vid) {
      MyService.downloadVids($scope.vid);
    }
    $scope.loadingVideo = $rootScope.loadingVideo;
    console.log($scope.loadingVideo);
  })
