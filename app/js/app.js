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
require('./directives/chart.directive.js');
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
    'chart'
  ]);

  // Services
  app.service('CamService', require('./services/cameras.service.js'));
  app.service('SessionService', require('./services/sessions.service.js'));
  app.service('PosService', require('./services/pos.service.js'));
  app.service('PeopleService', require('./services/people.service.js'));
  app.service('StoreService', require('./services/stores.service.js'));
  app.service('ReportService', require('./services/reports.service.js'));

  // // Controllers
  app.controller('CamController', require('./controllers/cameras.controller'));
  app.controller('LoginController', require('./controllers/login.controller'));
  app.controller('MainController', require('./controllers/main.controller'));
  app.controller('StoreController', require('./controllers/stores.controller'));
  app.controller('UserController', require('./controllers/users.controller'));
  app.controller('ReportController', require('./controllers/reports.controller'));

  // // Filters
  // app.filter('heatFilter', require('./filters/heatFilter.js'));

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
