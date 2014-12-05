/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
var moment = require('moment');
/*jslint browser:true, nomen:true*/
module.exports = function($scope, $routeParams, $location, Cam) {
  'use strict';
  $location.replace();
  document.title = 'Sentia.io - Camera';
  $scope.date = moment.utc($routeParams.date)
    .hours(0)
    .minutes(0)
    .seconds(0)
    .millisecond(0)
    .toDate();
  // $location.search('date', $scope.date);
  $location.search('date', moment($scope.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));
  $scope.store = "54318d4064acfb0b3139807e"; // because we only have one :)
  $scope.$root.showHeader = true;
  $scope.$root.page = 'cam';
  // $scope.people = {};
  if (Cam.selectedCam) {
    $scope.camera = Cam.selectedCam;
  } else if ($routeParams.id) {
    Cam.read($routeParams.id)
      .then(function(cam) {
        $scope.camera = cam;
        updateOverlay();
          getPeople();
      });
  }
  $scope.$watch('date', function() {
    $location.replace();
    $location.search('date', moment($scope.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));
    // $location.search('date', $scope.date);
    updateOverlay();
    getPeople();
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'CamCtrl',
      camera : ($scope.camera)? $scope.camera._id : $routeParams.id,
      date : $scope.date
    });
  });
  $scope.tabs ={
    active : Number($routeParams.tab) || 0
  };
  $location.search('tab', $scope.activeTab);

  $scope.selectTab = function(tab) {
    $location.replace();
    mixpanel.track('switched tab', {
      page : document.title,
      controller: 'CamCtrl',
      camera : $scope.camera.id,
      tab : tab
    });
    $scope.tabs.active = tab;
    $location.search('tab', tab);
  };
  function getPeople () {
    if (!$scope.camera || !$scope.camera.counter) {
      return;
    }
    Cam.getPeople({camera: $scope.camera._id, date: $scope.date})
    .then(function(data) {
      if (!data) {
        return;
      }
      var people_in = [], people_out = [], bounce = [], i,total_bounce = 0, total_in = 0, total_out = 0;
      for (i = 0; i < 15; i += 1) {
        people_in.push(0);
        people_out.push(0);
        bounce.push(0);
      }

      data.forEach(function (e) {
        if (e.hour >= 9 && e.hour <= 23) {
          total_in += Number(e.people_in);
          total_out += Number(e.people_out);
          total_bounce += Number(e.bounce);
          
        }
        people_in[e.hour-9] = e.people_in;
        people_out[e.hour-9] = e.people_out;
        bounce[e.hour-9] = e.bounce;
      });
      $scope.people = {
        total_in : total_in,
        total_out : total_out,
        total_bounce : total_bounce,
        people_in : {
          labels: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [{
            label: "In",
            fillColor: "#90CCFF",
            strokeColor: "#36a3ff",
            pointColor: "#36a3ff",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: people_in
          }]
        },
        people_out : {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [{
            label: "Out",

            fillColor: "#F7CB8F",
            strokeColor: "#f0ad4e",
            pointColor: "#f0ad4e",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: people_out
          }]
        },
        bounce : {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [
          {
            label: "Bounce",
            fillColor: "#F86154",
            strokeColor: "#cd1606",
            pointColor: "#cd1606",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: bounce
          }]
        }
      };
    });
  }
  function updateOverlay() {
    if (!$scope.camera) {
      return;
    }
    var query = {
      camera: $scope.camera._id,
      date: $scope.date
    };

    $scope.map = undefined;
    Cam.getMap(query)
      .then(function(response) {
        $scope.map = response;
      });
  }
  mixpanel.track('page viewed', {
    'page': document.title,
    'url': window.location.pathname,
    controller: 'CamCtrl',
    camera : ($scope.camera)? $scope.camera._id : $routeParams.id
  });

};
