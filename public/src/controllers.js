angular.module('youtApp')
  .controller('vidList', function($rootScope, $scope, MyService) {

    MyService.getCustomers();
    $scope.customers = $rootScope.customersFactory;
    console.log($scope.customers);
    $scope.echoscope = function() {
      console.log($scope.customers + '  ----$scope.customers');
      console.log($rootScope.customersFactory + "  ----$rootScope.customersFactory");
    }
    $scope.refreshList = function() {
      MyService.getCustomers();
      $scope.customers = $rootScope.customersFactory;
    }
  })
  .controller('downloadVid', function($rootScope, $scope, MyService) {
    $scope.downloadVid = function() {
      MyService.downloadVids();
    }
  })
