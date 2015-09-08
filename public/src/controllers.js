angular.module('youtApp')
  .controller('vidList', function ($rootScope, $scope, MyService) {

    $scope.customers = MyService.getCustomers();
    $scope.customers = $rootScope.customers;
    console.log($scope.customers);
    $scope.refreshListFun2 = function () {

      $scope.customers = MyService.getCustomers();
      $scope.customers = $rootScope.customers;

    //  console.log($rootScope.customers + "         r rrcontroller");
    //  console.log($scope.customers + "          s rrcontroller");
    }
  })
  .controller('vidListTest', function ($rootScope, $scope, MyService) {
    $scope.refreshListFun = function () {

      $scope.customers = MyService.getCustomers();
      $scope.customers = $rootScope.customers;

    //  console.log($rootScope.customers + "         r controller");
    //  console.log($scope.customers + "          s controller");
    }
  });
