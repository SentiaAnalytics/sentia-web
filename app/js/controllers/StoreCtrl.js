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
  Cam.find('54318d4064acfb0b3139807e')
    .then(function(cameras) {
      $scope.cameras = cameras;
    });
  $scope.selectCamera = function(cam) {
    Cam.selectedCam = cam;
    $scope.$root.go('/store/camera/' + cam._id, 'animate-scale');

  };
};
