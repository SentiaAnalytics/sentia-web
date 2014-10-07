/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

module.exports = function($scope, Store, Cam) {
  'use strict';
  $scope.$root.showHeader = true;
  $scope.$root.page = 'store';
  $scope.tabs = {
    details : false,
    stats : false,
    cameras : true
  };
  Cam.find('54318d4064acfb0b3139807e')
    .then(function(cameras) {
      $scope.cameras = cameras;
    });
  $scope.selectCamera = function(cam) {
    Cam.selectedCam = cam;
    $scope.$root.go('/store/camera/' + cam._id, 'animate-scale');

  };
  $scope.selectTab = function (tab) {
    var i;
    for (i in $scope.tabs) {
      if ($scope.tabs.hasOwnProperty(i)) {
        $scope.tabs[i] = false;
      }
    }
    $scope.tabs[tab] = true;
  };

};
