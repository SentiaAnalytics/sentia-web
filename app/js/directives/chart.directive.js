/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
var $ = require('jquery');
var chartist = require('chartist');
angular.module('chart', [])
  .directive('chart', function() {
    'use strict';
    var defaults = {
      height: 250,
      showArea: true,
      // low : 0,
      lineSmooth: false,
      axisX: {
        showGrid: false
      }
    };
    return {
      template: '',
      restrict: 'E',
      scope: {
        data: '=',
        options: '=',
        charttype : '@',
        trigger: '='
      },
      link: function postLink($scope, element) {
        var chart;
        $scope.$watch('data', update);
        $scope.$watch('trigger', update);
        element.addClass('ct-chart');
        draw();

        function draw() {
          var data = {
            // A labels array that can contain any sort of values
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            // Our series array that contains series objects or in this case series data arrays
            series: [
              [5, 2, 4, 2, 0]
            ]
          };
          
          var options = angular.extend($scope.options || {}, defaults);
          element.find('*').remove();
          console.log($scope.charttype);
          if ($scope.charttype && $scope.charttype.toLowerCase() === 'bar') {
            chart = chartist.Bar(element[0], data, options);
            addBarTooltip(element);
          } else {
            chart = chartist.Line(element[0], data, options);
            addLineTooltip(element);
          }
          
        }
        function easeOutQuad (x, t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
        }

        function addBarTooltip (element) {
          var $toolTip = $(element[0])
            .append('<div class="ct-tooltip"></div>')
            .find('.ct-tooltip')
            .hide();
          element.on('mouseenter', '.ct-bar', function() {
            var $bar = $(this),
              value = $bar.attr('ct:value');

            $bar.animate({
              'stroke-width': '80px'
            }, 200, easeOutQuad);
            $toolTip.css({
              left: Number($bar.attr('x2')) - $toolTip.width() / 2 + 1,
              top: Number($bar.attr('y2')) - $toolTip.height() - 18
            });
            $toolTip.html(value).show();
          });

          element.on('mouseleave', '.ct-bar', function() {
            var $bar = $(this);
            $bar.animate({
              'stroke-width': '65px'
            }, 200, easeOutQuad);
            $toolTip.hide();
          });
        }
        function addLineTooltip (element) {
          var $toolTip = $(element[0])
            .append('<div class="ct-tooltip"></div>')
            .find('.ct-tooltip')
            .hide();
          element.on('mouseenter', '.ct-point', function() {
            var $point = $(this),
              value = $point.attr('ct:value');

            $point.animate({
              'stroke-width': '17px'
            }, 200, easeOutQuad);

            $toolTip.css({
              left: Number($point.attr('x2')) - $toolTip.width() / 2 + 1,
              top: Number($point.attr('y2')) - $toolTip.height() - 18
            });
            $toolTip.html(value).show();
          });

          element.on('mouseleave', '.ct-point', function() {
            var $point = $(this);
            $point.animate({
              'stroke-width': '10px'
            }, 200, easeOutQuad);
            $toolTip.hide();
          });
        }

        function update() {
          if (chart) {
            chart.update($scope.data);
          }
        }
      }
    };
  });
