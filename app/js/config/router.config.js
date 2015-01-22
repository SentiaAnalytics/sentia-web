module.exports = function($routeProvider) {
  'use strict';
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/store/camera/:cameraId', {
      templateUrl: 'views/cam.html',
      controller: 'CamerasController',
      reloadOnSearch: false
    })
    .when('/store/:storeId/report', {
      templateUrl: 'views/report.html',
      controller: 'ReportsController',
      reloadOnSearch: false
    })
    .when('/store', {
      templateUrl: 'views/store.html',
      controller: 'StoresController',
      reloadOnSearch: false
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UsersController',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/'
    });
};
