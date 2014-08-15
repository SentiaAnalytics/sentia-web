/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
/*global app:true, $:true, console: false, angular:false */
angular.module('app')
    .controller('MainCtrl', function ($scope, $http, $location) {
        'use strict';
        $scope.$root.showMenu = false;
        $scope.logout = function () {
            $http.post('/user/logout')
                .success(function () {
                    $location.path('/login');
                })
                .error(function (err, status) {
                    console.log(status + ' : ' + err);
                });
        };
        $scope.toggleMenu = function () {
            $scope.$root.showMenu = !$scope.$root.showMenu;
        };
        $scope.alert = function () {
        };

    });


