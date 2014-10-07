/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/

module.exports = function ($scope,  $http, $location) {
  'use strict';
  $scope.$root.showHeader = false;
  $scope.credentials = {};

  $scope.login = function () {
      console.log($scope.credentials);
      if(!$scope.credentials.email || !$scope.credentials.password) {return;}
      $http.post('/api/session/authenticate', $scope.credentials)
          .success(function (response) {
              $scope.$root.showHeader = true;
              $scope.$root.user = response;
              $location.path('/store');
          })
          .error(function (error) {
              $scope.loginError = error;
              console.log(error);

          });
  };

};
