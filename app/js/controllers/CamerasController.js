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
  $scope.$parent.$watch('endDate', function() {
    //update url
    $location.replace();
    $location.search('endDate', moment($parent.endDate).format('YYYY-MM-DDTHH:mm:ss.00Z'));

    if ($parent.startDate > $parent.endDate) {
      $parent.startDate = moment($parent.endDate).toDate();
    }
    //update data
    refresh();

    //analytics
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'CamController',
      camera : ($parent.camera)? $parent.camera._id : $routeParams.id,
      selected_date : $parent.endDate.toString(),
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
    var query = {
      cameras: [$scope.camera._id],
      startDate: $parent.endDate,
      endDate: $parent.endDate
    };
    updatePeopleTotal(query);
    updatePeopleChart(query);

  }
  function updatePeopleChart (query) {
    $scope.peopleChartData = null;
    PeopleService.getLineChart(query)
      .then(function (peopleChartData) {
          $scope.peopleChartData = peopleChartData;
      });
  }
  function updatePeopleTotal (query) {
    $scope.totalPeopleIn = null;
    PeopleService.getTotalPeopleIn(query)
      .then(function (totalPeopleIn) {
          $scope.totalPeopleIn = totalPeopleIn;
      });
  }

  function updateOverlay() {
    if (!$parent.camera) {
      return;
    }
    var query = {
      camera: $parent.camera._id,
      startDate: $parent.endDate,
      endDate: $parent.endDate
    };

    $scope.map = undefined;
    CamerasService.getMap(query)
      .then(function(response) {
        $scope.map = response;
      });
  }
};
