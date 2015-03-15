/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
module.exports = function ($scope, $location, SessionsService) {
  'use strict';
  var moment = require('moment');


  //bindables
  $scope.$root.showMenu = false;
  $scope.logout = logout;
  $scope.test = 'YO';

  // shared bindables
  $scope.store = null;
  $scope.camera = null;
  $scope.startDate = moment.utc($location.$$search.startDate) // take the date from the url or use today
    .startOf('day')
    .toDate();
    
  $scope.endDate = moment.utc($location.$$search.endDate) // take the date from the url or use today
    .startOf('day')
    .toDate();

  // setup
  mixpanel.register({
    host : window.location.hostname
  });

  mixpanel.track('page load', {
    url : window.location,
    page : window.title,
    path : window.location.pathname
  });

  loadSession();


  // functions
  function loadSession () {
    SessionsService.get()
      .then(function (session) {
          //body
        $scope.$root.user = session.user;
        if ($location.url() === '/') {
          $location.path('/store');
        }
      })
      .catch(function () {
        $location.path('/login');
      });

  }

  function logout () {
    return SessionsService.logout()
      .then(function () {
        $location.path('/login');
      });
  }
};
