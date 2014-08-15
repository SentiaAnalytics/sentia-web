/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

/*jslint browser:true, nomen:true*/
angular.module('app')
    .controller('CamCtrl', function($scope, $route, $routeParams, $location, Cam) {
        'use strict';
        var today;
        function updateTimeline() {
            Cam.getTimeline({
                date : $scope.mapQuery.date,
                type : $scope.mapQuery.type
            })
            .then(function (response) {
                $scope.timeline = response;
            });
        }
        function updateOverlay() {
            var query = {
                limit : 1,
                date : $scope.mapQuery.date,
                type : $scope.mapQuery.type,
                hour : $scope.mapQuery.hour,
            };
            $scope.map = undefined;
            Cam.getOverlay(query)
                .then(function (response) {
                    $scope.map = response;
                });
        }
        if (Cam.selectedCam) {
            $scope.cam = Cam.selectedCam;
        } else if ($routeParams.id) {
            Cam.getCam($routeParams.id)
                .then(function (cam) {
                    $scope.cam = cam;
                    updateTimeline();
                    updateOverlay();
                })
        }
        $route.current.params.date = 123;

        $scope.store = "52fd38afe0461b48a7f9c297"; // because we only have one :)
        $scope.$root.showHeader = true;
        $scope.$root.page = 'cam';
        today = moment.utc()
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .subtract('hours', 1).toDate();
        $scope.mapQuery = {
            limit: 1,
            date: today,
            hour: today.getHours(),
            type: 'heat',
            cam : $scope.cam
        };
        $scope.$watch('mapQuery.hour', function() {
            updateOverlay();
        });
        $scope.$watch('mapQuery.date', function() {
            updateTimeline();
            updateOverlay();
        });
        $scope.$watch('mapQuery.type', function() {
            updateTimeline();
            updateOverlay();
        });
    }
);
