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

};
