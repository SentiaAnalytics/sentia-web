/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
var moment = require('moment');
module.exports = function ($scope, $location, SessionService) {
  'use strict';


  //bindables
  $scope.$root.showMenu = false;
  $scope.logout = logout;
  $scope.test = 'YO';

  // shared bindables
  $scope.store = null;
  $scope.camera = null;
  $scope.date = moment.utc($location.$$search.date) // take the date from the url or use today
    .startOf('day')
    .toDate();

  // setup
  mixpanel.register({
    host : window.location.hostname
  });

  mixpanel.track('page load', {
    page : window.title,
    path : window.location.pathname
  });

  loadSession();


  // functions
  function loadSession () {
    SessionService.get()
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
    return SessionService.logout()
      .then(function () {
        $location.path('/login');
      });
  }
};
