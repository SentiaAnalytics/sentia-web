/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
 var moment = require('moment');
 require('../services/CamService.js');

/*jslint browser:true, nomen:true*/
module.exports = function($scope, $route, $routeParams, $location, Cam) {
  'use strict';
  var today;
  function updateTimeline() {
      Cam.getTimeline({
          date : $scope.mapQuery.date,
          type : $scope.mapQuery.type
      })
      .then(function (response) {
          $scope.timeline = response;
      });
  }
  function updateOverlay() {
      var query = {
          limit : 1,
          date : $scope.mapQuery.date,
          type : $scope.mapQuery.type,
          hour : $scope.mapQuery.hour,
      };
      $scope.map = undefined;
      Cam.getOverlay(query)
          .then(function (response) {
              $scope.map = response;
          });
  }
  console.log($routeParams);
  if (Cam.selectedCam) {
      $scope.cam = Cam.selectedCam;
  } else if ($routeParams.id) {
    console.log($routeParams.id);
      Cam.read($routeParams.id)
          .then(function (cam) {
              $scope.cam = cam;
              updateTimeline();
              updateOverlay();
          });
  }
  $route.current.params.date = 123;

  $scope.store = "54318d4064acfb0b3139807e"; // because we only have one :)
  $scope.$root.showHeader = true;
  $scope.$root.page = 'cam';
  today = moment.utc()
      .minutes(0)
      .seconds(0)
      .millisecond(0)
      .subtract('hours', 1).toDate();
  $scope.mapQuery = {
      limit: 1,
      date: today,
      hour: today.getHours(),
      type: 'heat',
      cam : $scope.cam
  };
  $scope.$watch('mapQuery.hour', function() {
      updateOverlay();
  });
  $scope.$watch('mapQuery.date', function() {
      updateTimeline();
      updateOverlay();
  });
  $scope.$watch('mapQuery.type', function() {
      updateTimeline();
      updateOverlay();
  });
  $scope.dt = new Date();

  $scope.minDate = $scope.minDate ? null : new Date();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};
