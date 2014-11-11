/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
module.exports = function ($scope, $http, $location) {
  'use strict';
  mixpanel.register({
    host : window.location.hostname
  });
  mixpanel.track('page load', {
    page : window.title,
    path : window.location.pathname
  })
  $http.get('/api/session')
    .success(function (session) {
      mixpanel.track('Session Loaded', {
        page : document.title,
        controller : 'MainCtrl',
        session : session
      });
      console.log('Active user: ', session.user.email);
      $scope.$root.showHeader = true;
      $scope.$root.user = session.user;
      if ($location.url() === '/') {
        $location.path('/store');
      }
    })
    .error(function () {
      $location.path('/login');
    });
  $scope.$root.showMenu = false;
  $scope.logout = function () {
      $http.delete('/api/session')
          .success(function () {
            mixpanel.track('logout', {
              page : document.title
            });
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
