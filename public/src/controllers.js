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
    }
    $scope.deleteVid = function (vid) {
      MyService.deleteVid(vid);
    }
  })
  .controller('downloadVid', function ($rootScope, $scope, MyService) {
    $scope.downloadVid = function (vid) {
      MyService.downloadVids($scope.vid);
    }
  })
