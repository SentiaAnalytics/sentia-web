/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
module.exports=  function() {
    'use strict';


    var $ = require('jquery');
    var moment = require('moment');
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
        labelInterpolationFnc : labelHour
      },
      axisY: {
        labelOffset: {
          y: 10
        },
        labelInterpolationFnc: function (val) {
            if (val > 1000000) {
              return Math.round(val/10000) / 100 + 'M';
            }
            if (val > 10000) {
              return Math.round(val/100) / 100 + 'K';
            }
        }
      }
    };
    function labelMonth(date) {
      return moment(date).format('MMM');
    }
    function labelDay(date) {
      return moment(date).format('D');
    }
    function labelHour(date) {
      return moment(date).format('HH');
    }
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
        var options = angular.extend({}, $scope.options, defaults);
        $element.addClass('ct-chart');
        render();
        $scope.$watch('data', render);
        $scope.$watch('trigger', render);


        function render () {
          $element.find('*').remove();
          if ($scope.data) {
            options.axisX.labelInterpolationFnc = getLabelFunc();
            chart = chartist.Line($element[0], $scope.data, options);
            addLineTooltip($element);
          } else {
            showLoader();
          }
        }
        function showLoader () {
          $element.append('<div class="loader"></div>');
        }

        function getLabelFunc() {
          var start = moment($scope.data.labels[0]);
          var end = moment($scope.data.labels[$scope.data.labels.length-1]);

          if (start.isSame(end, 'day')) {
            return labelHour;
          } else if (start.isSame(end, 'month')) {
            return labelDay;
          }
          return labelMonth;
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

        function easeOutQuad (x, t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
        }

      }
    };
  };
