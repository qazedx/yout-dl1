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
      link: function ($scope,$rootScope, element, attr, MyService) {
        $('.reffbtn').bind('click', function ($rootScope, MyService) {
          $scope.customers = MyService.getCustomers();
          $scope.vidlists = $scope.customers;
          console.log($scope.customers + "          $scope");
        });

      }
    };
  })
