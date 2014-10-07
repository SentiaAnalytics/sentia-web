/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
 var moment = require('moment');
/*jslint browser:true, nomen:true*/
module.exports = function($scope, $route, $routeParams, $location, Cam) {
  'use strict';
  var today;
  function updateOverlay() {
      var query = {
          camera : $scope.cam._id,
          from : $scope.mapQuery.date
      };
      $scope.map = undefined;
      Cam.getMap(query)
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
              updateOverlay();
          });
  }
  $route.current.params.date = 123;

  $scope.store = "54318d4064acfb0b3139807e"; // because we only have one :)
  $scope.$root.showHeader = true;
  $scope.$root.page = 'cam';
  today = moment.utc()
      .hours(0)
      .minutes(0)
      .seconds(0)
      .millisecond(0)
      .subtract('hours', 1);
  $scope.mapQuery = {
      type : 'heat',
      from : today.format(),
      cam : $scope.cam
  };
  $scope.$watch('mapQuery.hour', function() {
      updateOverlay();
  });
  $scope.$watch('mapQuery.date', function() {
      updateOverlay();
  });
  $scope.$watch('mapQuery.type', function() {
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
  $scope.setMapType = function (type) {
    $scope.mapQuery.type = type;
  };
};
