/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
module.exports=  function() {
    'use strict';
    var $ = require('jquery');
    var chartist = require('chartist');
    var defaults = {
      height: 250,
      showArea: true,

      // low : 0,
      lineSmooth: false,
      axisX: {
        showGrid: false,
        labelOffset: {
          x: -3,
          y: 3
        },
        labelInterpolationFnc : function (x) {
            return x + 1;
        }
      },
      axisY: {
        labelOffset: {
          y: 10
        }
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
        var $element = $(element[0]);
        var dummydata = {
            // A labels array that can contain any sort of values
            labels: [0],
            // Our series array that contains series objects or in this case series data arrays
            series: [
              [0]
            ]
          };
        $element.addClass('ct-chart');
        draw();
        $element.append('<div class="loader"></div>');
        $scope.$watch('data', update);
        $scope.$watch('trigger', update);


        function draw() {


          var options = angular.extend($scope.options || {}, defaults);
          element.find('*').remove();

          chart = chartist.Line(element[0], dummydata, options);
          addLineTooltip(element);

        }
        function easeOutQuad (x, t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
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
              'stroke-width': '20px'
            }, 200, easeOutQuad);

            $toolTip
              .html(value)
              .show()
              .css({
                left: Number($point.attr('x2')) - $toolTip.width() / 2 - 6,
                top: Number($point.attr('y2')) - $toolTip.height() - 43
              });
          });

          element.on('mouseleave', '.ct-point', function() {
            var $point = $(this);
            $point.animate({
              'stroke-width': '13px'
            }, 200, easeOutQuad);
            $toolTip.hide();
          });
        }

        function update() {
          if (!chart || !chart.optionsProvider) {
            return;
          }
          if (!$scope.data) {
            $element.find('.loader').show();
            chart.update(dummydata);
            return;
          }
          $element.find('.loader').hide();
          chart.update($scope.data);

        }
      }
    };
  };
