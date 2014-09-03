/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
module.exports = function ($scope, $http, $location) {
  'use strict';
  $http.get('/api/users/active')
    .success(function (user) {
      console.log('Active user: ', user.email);
      $scope.$root.showHeader = true;
      $scope.$root.user = user;
    })
    .error(function () {
      $location.path('/login');
    });
  $scope.$root.showMenu = false;
  $scope.logout = function () {
      $http.delete('/api/session')
          .success(function () {
              $location.path('/login');
          })
          .error(function (err, status) {
              console.log(status + ' : ' + err);
          });
  };
  $scope.toggleMenu = function () {
      $scope.$root.showMenu = !$scope.$root.showMenu;
  };
};
