/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
require('chartjs');
console.log('WINDOW');
console.log(window.Chart);
angular.module('linechart', [])
  .directive('linechart', function() {
    'use strict';
    return {
      template: '<canvas style="width:100%; height:100%;"></canvas>',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element) {
        scope.$watch('data', function() {
          if (!scope.data) {
            return;
          }
          var ctx = element.find('canvas')[0].getContext("2d");
          
          var linechart = new Chart(ctx).Line(scope.data, {responsive : true, scaleFontColor: "#bababa", scaleLineColor: "#f5f5f5"}); 
        });
      }
    };
  });
