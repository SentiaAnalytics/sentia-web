/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
var moment = require('moment');
/*jslint browser:true, nomen:true*/
module.exports = function($scope, $routeParams, $location, CamService, PeopleService) {
  'use strict';
  var $parent = $scope.$parent;
  // bindables

  $scope.tabs = {
    active : Number($routeParams.tab) || 0
  };
  $scope.selectTab = selectTab;
  $scope.charts = {
    options : {
      range : [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      hoverCallback : function (index, options, content, row) {
        return '<span class="caps">' + row.x + ':00</span>|<span class="text-primary"> ' + row.y + '</span>';
      }
    }
  };

  // setup
  document.title = 'Sentia.io - Camera';
  $location.replace();
  $location.search('date', moment($scope.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));
  $location.search('tab', $scope.activeTab);
  

  if (!$parent.camera) {
    CamService.read($routeParams.cameraId)
      .then(function(camera) {
        $parent.camera = camera;
        updateOverlay();
        updatePeople();
      });
  }

  // watch

  $scope.$parent.$watch('date', function() {
    //update url
    $location.replace();
    $location.search('date', moment($parent.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));

    //update data
    updateOverlay();
    updatePeople();

    //analytics
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'CamController',
      camera : ($parent.camera)? $parent.camera._id : $routeParams.id,
      date : $parent.date
    });
  });

  // analytics
  mixpanel.track('page viewed', {
    'page': document.title,
    'url': window.location.pathname,
    controller: 'CamController',
    camera : ($parent.camera)? $parent.camera._id : $routeParams.id
  });
  
  

  function selectTab (tab) {
    $location.replace();
    mixpanel.track('switched tab', {
      page : document.title,
      controller: 'CamController',
      camera : $parent.camera.id,
      tab : tab
    });
    $scope.tabs.active = tab;
    $location.search('tab', tab);
  }

  function updatePeople () {
    if (!$parent.camera) {
      return;
    }
    PeopleService.getLineChart($parent.camera._id, $parent.date)
      .then(function (data) {
        if (!data) {
          return;
        }

        $scope.people = {
          total : data.series[0].reduce(function (result, item) {
            return result + item;
          },0),
          data : data
        };
      });
  }

  function updateOverlay() {
    if (!$parent.camera) {
      return;
    }
    var query = {
      camera: $parent.camera._id,
      date: $parent.date
    };

    $scope.map = undefined;
    CamService.getMap(query)
      .then(function(response) {
        $scope.map = response;
      });
  }
};
