angular.module('youtApp')
  .directive('dlField', function() {
    return {
      restrict: 'EA',
      templateUrl: 'views/dl-field.html',
      replace: false,
      link: function($scope, element, attr) {
        $('#idl-input').on('click', function() {
            this.setSelectionRange(0, this.value.length) // select input on click
        });
      }
    };
  })
  .directive('list',['MyService',  function(MyService) {
    return {
      restrict: 'AE',
      templateUrl: 'views/list.html',
      replace: true,
      link: function($scope, element, attr) {

        $scope.deleteVid = function(video_id){
          console.log(video_id);
          $('#'+video_id).html('');
            MyService.deleteVid(video_id);
        }

      }
    };
  }])
