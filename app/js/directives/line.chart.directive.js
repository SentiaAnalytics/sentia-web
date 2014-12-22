/*global Morris:false,jQuery:false*/
/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
require('raphael');
require('morris.js');
angular.module('linechart', [])
  .directive('linechart', function() {
    'use strict';
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '=',
        options : '=',
        trigger : '='
      },
      link: function postLink($scope, element) {
        var timer;
        $scope.$watch('data', draw);
        $scope.$watch('trigger', draw);

        function draw() {
          if (!$scope.data) {
            return;
          }
          element.find('*').remove();
          console.log($scope.options.range.map(function (e) {return '' + e;}));
          var options = {
            element : element[0],
            data : $scope.data,
            xkey : 'x',
            ykeys : ['y'],
            labels : $scope.options.range,
            lineColors : ['#36a3ff'],
            dateFormat : function () {return '';},
            hoverCallback: $scope.options.hoverCallback || function (index, options, content, row) {
              return '<span class="caps">' + row.x + '</span>|<span class="text-primary"> ' + row.y + '</span>';
            }
          };
         Morris.Area(options);
        }
        jQuery(window).on('resize', function() { 
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(draw, 50);
        });
      }
    };
  });
