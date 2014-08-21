module.exports = function($routeProvider) {
  'use strict';
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashCtrl'
    })
    .when('/store/camera/:id', {
      templateUrl: 'views/cam.html',
      controller: 'CamCtrl'
    })
    .when('/store', {
      templateUrl: 'views/store.html',
      controller: 'StoreCtrl'
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UserCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });
};
