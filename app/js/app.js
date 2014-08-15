/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */
 /*jslint browser:true, nomen:true*/
 /*global FastClick: false */

(function () {
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
    // configure routes
    // Controllers are definedd in controllers.js
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/dashboard', {
                    templateUrl : 'views/dashboard.html',
                    controller: 'DashCtrl'
                })
                .when('/store/camera/:id', {
                    templateUrl : 'views/cam.html',
                    controller: 'CamCtrl'
                })
                .when('/store', {
                    templateUrl : 'views/store.html',
                    controller: 'StoreCtrl'
                })
                .when('/users', {
                    templateUrl : 'views/users.html',
                    controller: 'UserCtrl'
                })
                .otherwise({
                    redirectTo: '/login'
                });
        }
    ]);
    app.run(function ($rootScope, $window, $location) {
        $rootScope.showHeader = false;
        $rootScope.user = {};
        $rootScope.go = function (path, animation) {
            console.log('GO');
            if (typeof(pageAnimationClass) === undefined) { // Use a default, your choice
                // $rootScope.pageAnimationClass = '';
            } else { // Use the specified animation
                // $rootScope.pageAnimationClass = animation;
            }
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

// init sockets
(function (io) {
    'use strict';
  // as soon as this file is loaded, connect automatically,
    var socket = io.connect();
    // Simple log function to keep the example simple
    function log () {
        if (typeof console !== 'undefined') {
            console.log.apply(console, arguments);
        }
    }
    if (typeof console !== 'undefined') {
        log('Connecting to Sails.js...');
    }

    socket.on('connect', function socketConnected() {

        // Listen for Comet messages from Sails
        socket.on('message', function messageReceived(message) {

            log('New comet message received :: ', message);

        });


        log(
            'Socket is now connected and globally accessible as `socket`.\n' +
            'e.g. to send a GET request to Sails, try \n' +
            '`socket.get("/", function (response) ' +
            '{ console.log(response); })`'
        );


    });

    window.socket = socket;

})(
    window.io

    // In case you're wrapping socket.io to prevent pollution of the global namespace,
    // you can replace `window.io` with your own `io` here:

);
