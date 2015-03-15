// load dependencies

window.jQuery = require('jquery');
require('angular');
// load angular modules
require('angular-route');
require('angular-touch');
require('angular-animate');
require('angular-md5');
require('angular-bootstrap');
require('angular-sanitize');
require('angular-ui-utils');
// load custom directives
require('./directives/flowmap.directive.js');
require('./directives/heatmap.directive.js');
require('./directives/picker.directive.js');
require('./directives/swiper.directive.js');
require('./directives/pickadate.directive.js');
require('./directives/charts');
(function() {
  'use strict';
  // create new angular module app
  var app = angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngMd5',
    'ngSanitize',
    'swiper',
    'picker',
    'pickadate',
    'ui.utils',
    'sFlowmap',
    'sHeatmap',
    'charts'
  ]);

  // Services
  app.service('CamerasService', require('./services/CamerasService.js'));
  app.service('SessionsService', require('./services/SessionsService.js'));
  app.service('PosService', require('./services/PosService.js'));
  app.service('PeopleService', require('./services/PeopleService.js'));
  app.service('StoresService', require('./services/StoresService.js'));
  app.service('ReportsService', require('./services/ReportsService.js'));

  // // Controllers
  app.controller('CamerasController', require('./controllers/CamerasController'));
  app.controller('LoginController', require('./controllers/LoginController'));
  app.controller('MainController', require('./controllers/MainController'));
  app.controller('StoresController', require('./controllers/StoresController'));
  app.controller('UsersController', require('./controllers/UsersController'));
  app.controller('ReportsController', require('./controllers/ReportsController'));

  // // Filters
  app.filter('waiting', require('./filters/waiting.filter.js'));
  app.filter('dkNumber', require('./filters/dkNumber.filter.js'));

  // configure routes
  app.config(require('./config/router.config.js'));

  app.run(function($rootScope, $window, $location, $http) {
    $rootScope.showHeader = false;
    $rootScope.user = {};
    $rootScope.go = function(path) {
      if (path === 'back') { // Allow a 'back' keyword to go to previous page
        $window.history.back();
      } else { // Go to the specified path
        $location.path(path);
      }
      $rootScope.showMenu = false;
    };
    $rootScope.logout = function () {
      $http.delete('/api/session')
      .success(function () {
        mixpanel.track('logout', {
          page : document.title
        });
        $location.path('/login');
      })
      .error(function (err, status) {
        console.log(status + ' : ' + err);
      });
    };
  });
})();
