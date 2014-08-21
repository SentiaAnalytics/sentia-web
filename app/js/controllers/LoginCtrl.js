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
      $http.post('/api/users/login', $scope.credentials)
          .success(function (response) {
              mixpanel.identify(response.id);
              mixpanel.people.set(angular.copy(response,{
                "$first_name": response.firstname,
                "$last_name": response.lastname,
                "$created": response.createdAt,
                "$email": response.email
              }));

              mixpanel.track('Logged In');
              $scope.$root.showHeader = true;
              $scope.$root.user = response;
              $location.path('/store');
          })
          .error(function (error) {
              console.log('ERROR');
              $scope.loginError = error;
              console.log(error);
              console.log(typeof error);
              mixpanel.track('Login Error', {
                email : $scope.credentials.email
              });

          });
  };

};
