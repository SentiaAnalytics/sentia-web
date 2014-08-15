/**
 * Controller for the dashborad view
 * @author Andreas
 * @date   2014-04-11
 */

/*global app:true, $:true, console: false, angular:false */
angular.module('app')
    .controller('DashCtrl', function($scope, $http) {
        'use strict';
        $scope.$root.showHeader = true;
        $scope.$root.page = 'dashboard';
        //
        $http.post('/customers/find', {date: new Date()})
            .then(function (response) {
                $scope.customerData = response.data;
            })
            .catch(console.log);
        // $scope.customerData = [{
                //     "time": new Date("2014-06-03T21:49:36.627Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T20:49:29.428Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T19:49:22.240Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T18:49:15.032Z"),
                //     "in": 85,
                //     "out": 79
                // }, {
                //     "time": new Date("2014-06-03T17:49:08.225Z"),
                //     "in": 152,
                //     "out": 124
                // }, {
                //     "time": new Date("2014-06-03T16:49:03.295Z"),
                //     "in": 174,
                //     "out": 201
                // }, {
                //     "time": new Date("2014-06-03T15:48:57.287Z"),
                //     "in": 64,
                //     "out": 60
                // }, {
                //     "time": new Date("2014-06-03T14:48:59.090Z"),
                //     "in": 22,
                //     "out": 22
                // }, {
                //     "time": new Date("2014-06-03T13:49:00.927Z"),
                //     "in": 19,
                //     "out": 25
                // }, {
                //     "time": new Date("2014-06-03T12:49:02.781Z"),
                //     "in": 20,
                //     "out": 19
                // }, {
                //     "time": new Date("2014-06-03T11:49:04.631Z"),
                //     "in": 38,
                //     "out": 25
                // }, {
                //     "time": new Date("2014-06-03T10:49:06.488Z"),
                //     "in": 23,
                //     "out": 15
                // }, {
                //     "time": new Date("2014-06-03T09:49:08.342Z"),
                //     "in": 18,
                //     "out": 28
                // }, {
                //     "time": new Date("2014-06-03T08:49:10.191Z"),
                //     "in": 12,
                //     "out": 18
                // }, {
                //     "time": new Date("2014-06-03T07:49:12.045Z"),
                //     "in": 4,
                //     "out": 1
                // }, {
                //     "time": new Date("2014-06-03T06:49:13.902Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T05:49:15.747Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T04:49:17.608Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T03:49:19.448Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T02:49:16.961Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T01:49:09.748Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-03T00:49:02.537Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-02T23:48:55.331Z"),
                //     "in": 0,
                //     "out": 0
                // }, {
                //     "time": new Date("2014-06-02T22:48:48.130Z"),
                //     "in": 0,
                //     "out": 0
                // }];
    });