angular.module('youtApp')
  .directive('dlField', function() {
    return {
      restrict: 'EA',
      templateUrl: 'views/dl-field.html',
      replace: false,
      link: function($scope, element, attr) {
        $('#idl-input').on('click', function() {
          // if (!$window.getSelection().toString()) {
            // Required for mobile Safari
            this.setSelectionRange(0, this.value.length)
          // }
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
        $('#deleteVid-btn').bind('click',function(){
          console.log('--------------$scope');
        })
        // element.matches('#deleteVid-btn').bind('click',function(){
        //   console.log('element--------------$scope');
        // })
        // $('#'+$scope.Videos.obj.video_id).html('');
      }
    };
  }])
