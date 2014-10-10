/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

module.exports = function($scope, Store, Cam) {
  'use strict';
  $scope.$root.showHeader = true;
  $scope.$root.page = 'store';
  $scope.currentTab = 0;
  $scope.selectTab = function (tab) {
    $scope.currentTab = tab;
  };
  $scope.date = new Date();
    
  Store.read('54318d4064acfb0b3139807e')
    .then(function (store) {
      $scope.store = store;
    });
  Cam.find('54318d4064acfb0b3139807e')
    .then(function(cameras) {
      $scope.cameras = cameras;
    });
  $scope.selectCamera = function(cam) {
    Cam.selectedCam = cam;
    $scope.$root.go('/store/camera/' + cam._id, 'animate-scale');
  };
  $scope.pos = {
    totalRevenue : 67834,
    totalTransactions : 1231,
    revenue : {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      datasets: [{
        label: "In",
        fillColor: "#E9F1C7",
        strokeColor: "#cde083",
        pointColor: "#cde083",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [0,0,0,0,0,0,0,0,0,1231,2322,3434,5354,5334,6312,4223, 3312, 2552, 3132, 2123, 0,0,0,0]
      }]
    },
    transactions : {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      datasets: [{
        label: "Out",
        
        fillColor: "#F7CB8F",
        strokeColor: "#f0ad4e",
        pointColor: "#f0ad4e",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [0,0,0,0,0,0,0,0,0,99,123,344,554,534,632,422, 523, 255, 112, 123, 0,0,0,0]
      }]
    }
  };
};
