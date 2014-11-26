module.exports = function($routeProvider) {
  'use strict';
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/store/camera/:id', {
      templateUrl: 'views/cam.html',
      controller: 'CamCtrl',
      reloadOnSearch: false
    })
    .when('/store/:id/report', {
      templateUrl: 'views/report.html',
      controller: 'ReportCtrl',
      reloadOnSearch: false
    })
    .when('/store', {
      templateUrl: 'views/store.html',
      controller: 'StoreCtrl',
      reloadOnSearch: false
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UserCtrl',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/'
    });
};
