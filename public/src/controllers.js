angular.module('youtApp')
  .controller('vidList', function ($rootScope, $scope, MyService) {

    MyService.getCustomers();
    $scope.customers = $rootScope.customersFactory;
    console.log($scope.customers);
    $scope.echoscope = function () {
      console.log($scope.customers + '  ----$scope.customers');
      console.log($rootScope.customersFactory + "  ----$rootScope.customersFactory");
    }
    $scope.refreshListFun2 = function () {
      MyService.getCustomers();
      // setTimeout(function(){
      $scope.customers = $rootScope.customersFactory;
      // },1000)


      //  console.log($rootScope.customers + "         r rrcontroller");
      console.log($scope.customers + "          s rrcontroller");
    }
  })
