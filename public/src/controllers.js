angular.module('youtApp')
  .controller('ListController', function ($scope, options) {

    $scope.sort = function (field) {
      $scope.sort.field = field;
      $scope.sort.order = !$scope.sort.order;
    };

    $scope.sort.field = 'firstName';
    $scope.sort.order = false;

    $scope.show = function (id) {
      $location.url('/contact/' + id);
    };

  })
  .controller('customerList', function ( $scope, MyService) {
    setTimeout(function(){
      $scope.customers = MyService.getCustomers();
      console.log($scope.customers);
    },3000)

  });
