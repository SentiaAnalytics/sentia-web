/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
require('chartjs');
angular.module('linechart', [])
  .directive('linechart', function() {
    'use strict';
    return {
      template: '<canvas style="width:100%; height:100%;"></canvas>',
      restrict: 'E',
      scope: {
        data: '=',
        trigger : '='
      },
      link: function postLink(scope, element) {
        var linechart;
        scope.$watch('data', draw);
        scope.$watch('trigger', draw);

        function draw() {
          if (!scope.data) {
            return;
          }
          if (linechart) {
            linechart.destroy();
          }
          var ctx = element.find('canvas')[0].getContext("2d");
          var options = {
            // showScale: false,
            scaleFontColor : 'transparent',
            scaleShowGridLines : false,
            responsive : true,
            // scaleFontColor: "#bababa",
            // scaleLineColor: "#f5f5f5"
          };
          
          linechart = new Chart(ctx).Line(scope.data, options); 
        }
      }
    };
  });
