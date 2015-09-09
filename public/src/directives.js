angular.module('youtApp')
  .directive('dlField', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/dl-field.html',
      replace: false,
      link: function ($scope, $rootScope, element, attr, MyService) {
        
      }
    };
  })
  .directive('list', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/list.html',
      replace: false,
      link: function ($scope, $rootScope, element, attr, MyService) {

      }
    };
  })
