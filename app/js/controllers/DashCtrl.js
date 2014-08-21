/**
 * Controller for the dashborad view
 * @author Andreas
 * @date   2014-04-11
 */

module.exports = function($scope, $http) {
  'use strict';
  $scope.$root.showHeader = true;
  $scope.$root.page = 'dashboard';
  //
  $http.post('/customers/find', {date: new Date()})
    .then(function (response) {
        $scope.customerData = response.data;
    })
    .catch(console.log);
};
