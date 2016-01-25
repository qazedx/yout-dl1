angular.module('youtApp')
  .directive('dlField', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/dl-field.html',
      replace: false,
      link: function ($scope, element, attr) {
        $('#idl-input').on('click', function () {
          this.setSelectionRange(0, this.value.length) // select input on click
        });
      }
    };
  })
  .directive('add2list', ['MyService', function (MyService) {
    return {
      restrict: 'AE',
      templateUrl: 'views/add2list.html',
      replace: true,
      link: function ($scope, element, attr) {

      }
    }
  }])
  .directive('live-playlist', function (MyService) {
    return {
      restrict: 'AE',
      templateUrl: 'views/live-playlist.html',
      replace: true,
      link: function ($scope, element, attr) {
        console.log("playlist from directive");
      }
    }
  })
  .directive('list', ['MyService', function (MyService) {
    return {
      restrict: 'AE',
      templateUrl: 'views/list.html',
      replace: true,
      link: function ($scope, element, attr) {
        var vid_add_arr = [];
        var vid_path_add_arr = [];
        $scope.addVid = function (video_id, path) {
          console.log(video_id);
          var panel = $('#' + video_id + '.panel');
          if (panel.hasClass('panel-primary')) {
            $('#' + video_id + ' button.addVid-btn').removeClass('btn-primary');
            panel.removeClass('panel-primary');
            var index = vid_add_arr.indexOf(video_id);
            if (index > -1) {
              vid_add_arr.splice(index, 1);
              vid_path_add_arr.splice(index, 1);
            }
          } else {
            $('#' + video_id + ' button.addVid-btn').addClass('btn-primary');
            panel.addClass('panel-primary');
            vid_add_arr.push(video_id);
            vid_path_add_arr.push(path);
          }
          $scope.vid_add_arr = vid_add_arr;
          $scope.vid_path_add_arr = vid_path_add_arr;


          if (vid_add_arr.length == 0 && !$('.add2list').hasClass('hidden')) {
            $('.add2list').addClass('hidden');
          } else {
            $('.add2list').removeClass('hidden');
          }
          console.log(vid_add_arr);
          console.log(vid_path_add_arr);
        };
        $scope.viewVid = function (video_id) {
          console.log(video_id);
          $('#' + video_id + '.panel').toggleClass('viewVid-single');
          $('#' + video_id + '.panel .panel-body').html('<video src="/vid/' + video_id + '.mp4" controls></video>')
        };

        $scope.deleteVid = function (video_id) {
          console.log(video_id);
          $('#' + video_id).html('');
          MyService.deleteVid(video_id);
        };
      }
    };
  }])
