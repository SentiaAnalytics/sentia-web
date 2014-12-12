module.exports = function($routeProvider) {
  'use strict';
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/store/camera/:cameraId', {
      templateUrl: 'views/cam.html',
      controller: 'CamController',
      reloadOnSearch: false
    })
    .when('/store/:storeId/report', {
      templateUrl: 'views/report.html',
      controller: 'ReportController',
      reloadOnSearch: false
    })
    .when('/store', {
      templateUrl: 'views/store.html',
      controller: 'StoreController',
      reloadOnSearch: false
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UserController',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/'
    });
};
