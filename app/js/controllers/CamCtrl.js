/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
 var moment = require('moment');
/*jslint browser:true, nomen:true*/
module.exports = function($scope, $route, $routeParams, $location, Cam) {
  'use strict';
  $scope.date = moment.utc()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .millisecond(0)
    .toDate();

  $scope.store = "54318d4064acfb0b3139807e"; // because we only have one :)
  $scope.$root.showHeader = true;
  $scope.$root.page = 'cam';
  $scope.camera = null;
  $scope.tabs = {
    details : true  ,
    heat : false,
    flow : false,
    counter : false
  };
  console.log($routeParams);
  if (Cam.selectedCam) {
      $scope.camera = Cam.selectedCam;
  } else if ($routeParams.id) {
    Cam.read($routeParams.id)
        .then(function (cam) {
            $scope.camera = cam;
            updateOverlay();
        });
  }
 
  $scope.$watch('date', function() {
      updateOverlay();
  });
  
  $scope.selectTab = function (tab) {
    var i;
    for (i in $scope.tabs) {
      if ($scope.tabs.hasOwnProperty(i)) {
        $scope.tabs[i] = false;
      }
    }
    $scope.tabs[tab] = true;
  };

  function updateOverlay() {
    if(!$scope.camera) {
      return;
    }
    var query = {
        camera : $scope.camera._id,
        from : $scope.date
    };

    $scope.map = undefined;
    Cam.getMap(query)
        .then(function (response) {
            $scope.map = response;
        });
  }
};
