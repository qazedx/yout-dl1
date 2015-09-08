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
        $scope.vidlists = $scope.customers;
        console.log($scope.vidlists +"$scope.vidlists");

      }
    };
  })
