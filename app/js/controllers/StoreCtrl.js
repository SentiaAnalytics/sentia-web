/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
require('../services/StoreService.js');

module.exports = function($scope, Store, Cam) {
  'use strict';
  $scope.$root.showHeader = true;
  $scope.$root.page = 'store';
  Store.getCameras()
    .then(function(cameras) {
      $scope.cameras = cameras;
    });
  $scope.selectCamera = function(cam) {
    Cam.selectedCam = cam;
    $scope.$root.go('/store/camera/' + cam.id, 'animate-scale');

  };
};
