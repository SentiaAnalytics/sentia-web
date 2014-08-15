/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
/*global app:true, $:true, console: false, angular:false */
angular.module('app')
    .controller('UserCtrl', function ($scope, $http, $location) {
        'use strict';
        $scope.$root.showHeader = true;
        $scope.$root.page = 'users';
    });


