/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
module.exports = function($scope) {
  'use strict';
  $scope.$root.showHeader = true;
  $scope.$root.page = 'users';
  mixpanel.track('page viewed', {
    'page name': document.title,
    'url': window.location.pathname,
    controller: 'UserCtrl'
  });
};
