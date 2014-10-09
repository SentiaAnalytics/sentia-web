// load dependencies

require('angular');

// load angular modules
require('jquery');
require('angular-route');
require('angular-touch');
require('angular-animate');
require('angular-md5');
require('angular-bootstrap');
require('angular-sanitize');
require('angular-ui-utils');
// load custom directives
require('./directives/sflowmap.js');
require('./directives/sheatmap.js');
require('./directives/picker.js');
require('./directives/tabs.js');
require('./directives/LineChart.js');

(function() {
  'use strict';
  // create new angular module app
  var app = angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngMd5',
    'ngSanitize',
    'tabs',
    // 'ui.bootstrap',
    'picker',
    'ui.utils',
    'sFlowmap',
    'sHeatmap',
    'linechart'
  ]);

  // Services
  app.service('Cam', require('./services/CamService.js'));
  app.service('Store', require('./services/StoreService.js'));
  app.service('Customer', require('./services/CustomerService.js'));

  // // Controllers
  app.controller('CamCtrl', require('./controllers/CamCtrl'));
  app.controller('LoginCtrl', require('./controllers/LoginCtrl'));
  app.controller('MainCtrl', require('./controllers/MainCtrl'));
  app.controller('StoreCtrl', require('./controllers/StoreCtrl'));
  app.controller('UserCtrl', require('./controllers/UserCtrl'));

  // // Filters
  // app.filter('heatFilter', require('./filters/heatFilter.js'));

  // configure routes
  app.config(require('./config/router.js'));

  app.run(function($rootScope, $window, $location) {
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
  });
  window.app = app;
})();
