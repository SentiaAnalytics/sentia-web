/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
/*jslint browser:true, nomen:true*/
module.exports = function($scope, $routeParams, $location, CamerasService, PeopleService) {
  'use strict';
  var moment = require('moment');
  var $parent = $scope.$parent;
  // bindables

  $scope.tabs = {
    active : Number($routeParams.tab) || 0
  };
  $scope.selectTab = selectTab;
  $scope.charts = {};

  // setup
  document.title = 'Sentia.io - Camera';
  $location.replace();
  // $location.search('date', moment($scope.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));
  $location.search('tab', $scope.activeTab);


  if (!$parent.camera || $parent.camera._id !== $routeParams.cameraId) {
    $parent.camera = null;
    CamerasService.read($routeParams.cameraId)
      .then(function(camera) {
        $parent.camera = camera;
        updateOverlay();
        updatePeople();
      });
  }

  refresh(); // update charts
  // watch
  $scope.$parent.$watch('startDate', function() {
    //update url
    $location.replace();
    $location.search('startSate', moment($parent.startDate).format('YYYY-MM-DDTHH:mm:ss.00Z'));

    //update data
    refresh();

    //analytics
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'CamController',
      camera : ($parent.camera)? $parent.camera._id : $routeParams.id,
      selected_date : $parent.startDate.toString(),
      url : window.location
    });
  });



  // analytics
  mixpanel.track('page viewed', {
    'page': document.title,
    controller: 'CamController',
    camera : ($parent.camera)? $parent.camera._id : $routeParams.id,
    url : window.location
  });



  function selectTab (tab) {
    $location.replace();
    mixpanel.track('switched tab', {
      page : document.title,
      controller: 'CamController',
      camera : $parent.camera.id,
      tab : tab,
      url : window.location
    });
    $scope.tabs.active = tab;
    $location.search('tab', tab);
  }
  function refresh () {
    updatePeople();
    updateOverlay();
  }

  function updatePeople () {
    $scope.charts.people = null;
    if (!$parent.camera) {
      return;
    }
    PeopleService.getLineChart($parent.camera._id, $parent.startDate)
      .then(function (data) {
        if (!data) {
          return;
        }
        $scope.charts.people = {
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
      date: $parent.startDate
    };

    $scope.map = undefined;
    CamerasService.getMap(query)
      .then(function(response) {
        $scope.map = response;
      });
  }
};
