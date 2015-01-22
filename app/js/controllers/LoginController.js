/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/

module.exports = function($scope, $http, $location) {
  'use strict';
  document.title = 'Sentia - Login';

  $scope.$root.showHeader = false;
  $scope.credentials = {};

  $scope.login = function() {
    $scope.loginError = '';
    if (!$scope.credentials.email) {
      $scope.loginError = 'Invalid Email';
      return;
    }
    if (!$scope.credentials.password) {
      $scope.loginError = 'Invalid password';
      return;
    }
    $http.post('/api/session/authenticate', $scope.credentials)
      .success(function(user) {
        mixpanel.identify(user._id);
        mixpanel.people.set({
          $first_name : user.firstname,
          $last_name : user.lastname,
          $email : user.email
        });
        mixpanel.track('login', {
          page : document.title,
          user : user,
          controller : 'LoginController'
        });
        $scope.$root.showHeader = true;
        $scope.$root.user = user;
        $location.path('/store');
      })
      .error(function(error) {
        mixpanel.track('error', {
          type : 'login',
          controller : 'LoginController',
          error : error
        });
        $scope.loginError = error;
        console.log(error);

      });
  };
  mixpanel.track('page viewed', {
    'page name': document.title,
    'url': window.location.pathname,
    controller: 'LoginController'
  });

};
