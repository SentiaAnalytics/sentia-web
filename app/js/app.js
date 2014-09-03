// load dependencies
require('angular/angular');
require('angular-route/angular-route');
require('angular-animate/angular-animate');
require('angular-touch/angular-touch');
require('angular-sanitize/angular-sanitize');
require('./lib/angular-md5/angular-md5.js');
require('./lib/angular-bootstrap/ui-bootstrap-tpls');
require('./lib/angular-ui-utils/ui-utils.js');

require('./lib/angulartics/src/angulartics.js');
require('./lib/angulartics/src/angulartics-mixpanel.js');

// Directives
require('./directives/sflowmap.js');
require('./directives/sheatmap.js');
require('./directives/linechart.js');
require('./directives/barchart.js');


(function() {
  'use strict';
  // create new angular module app
  var app = angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'angular-md5',
    'ui.bootstrap',
    'ngSanitize',
    'ui.utils',
    'sHeatmap',
    'sFlowmap',
    'angulartics',
    'angulartics.mixpanel',
    'linechart',
    'barchart'
  ]);

  // Services
  app.service('Cam', require('./services/CamService.js'));
  app.service('Store', require('./services/StoreService.js'));
  app.service('Customer', require('./services/CustomerService.js'));

  // Controllers
  app.controller('CamCtrl', require('./controllers/CamCtrl'));
  app.controller('DashCtrl', require('./controllers/DashCtrl'));
  app.controller('LoginCtrl', require('./controllers/LoginCtrl'));
  app.controller('MainCtrl', require('./controllers/MainCtrl'));
  app.controller('StoreCtrl', require('./controllers/StoreCtrl'));
  app.controller('UserCtrl', require('./controllers/UserCtrl'));

  // Filters
  app.filter('heatFilter', require('./filters/heatFilter.js'));

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
