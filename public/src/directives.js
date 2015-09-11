angular.module('youtApp')
  .directive('dlField', function() {
    return {
      restrict: 'EA',
      templateUrl: 'views/dl-field.html',
      replace: false,
      link: function($scope, $rootScope, element, attr, MyService) {
        $('#idl-input').on('click', function() {
          // if (!$window.getSelection().toString()) {
            // Required for mobile Safari
            this.setSelectionRange(0, this.value.length)
          // }
        });
      }
    };
  })
  .directive('list', function() {
    return {
      restrict: 'EA',
      templateUrl: 'views/list.html',
      replace: false,
      link: function($scope, $rootScope, element, attr, MyService) {

        element.on('click',function(){
          console.log($scope.videos+'--------------$scope');
        })
  // $('#'+$scope.Videos.obj.video_id).html('');
      }
    };
  })
