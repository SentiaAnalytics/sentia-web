/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */

require('d3');
angular.module('sFlowmap', [])
  .directive('sFlowmap', function() {
    'use strict';
    return {
      template: '<svg></svg>',
      restrict: 'E',
      scope: {
        data: '=',
        rows: '=',
        cols: '=',
        trigger : '='
      },
      link: function postLink(scope, element) {
        function updateMap() {
          var color, scalex, scaley, width, opacity, height, max = 1000;

          if (!scope.data) {
            return;
          }
          var data = scope.data.reduce(function(result, item) {
            result = result || [];
            var i = {
              x: item.x,
              y: item.y,
              angle: Math.atan2(item.dx, item.dy),
              magnitude: Math.sqrt(Math.pow(item.dx, 2), Math.pow(item.dy,
                1))
            };
            if (i.magnitude > (0.1 * max)) {
              result.push(i);
            }
            return result;
          }, []);
          width = element[0].offsetWidth * 2;
          height = element[0].offsetHeight * 2;
          color = d3.scale.linear()
            .domain([0, max * 0.3, max])
            .range(['yellowgreen', '#FFFF83', 'red']);
          opacity = d3.scale.linear()
            .domain([0, 4])
            .range([0, 1]);
          scalex = d3.scale.linear()
            .domain([0, scope.cols * 0.1])
            .range([0, width]);
          scaley = d3.scale.linear()
            .domain([0, scope.rows * 0.1])
            .range([0, height]);
          d3.select(element[0])
            .select('svg')
            .text('')
            .attr('viewBox', '0 0 ' + width + ' ' + height) // + scope.data.cols + ' ' + scope.data.rows)
          .selectAll('path')
          // .data(scope.data.data)
          .data(data)
            .enter()
            .append('path')
            .attr('fill', function(d) {
              return color(d.magnitude);
            })
            .attr('d', 'm 15 0 l-30 -10 l 5 10 l-5 10 z')
            .attr('transform', function(d) {
              return 'translate(' + scalex(d.x) + ',' + scaley(d.y) +
                '), rotate(' + d.angle / (2 * Math.PI) * 360 + ')';
            })
            .attr('opacity', function (d) {
              return opacity(d.magnitude);
            });
        }
        scope.$watch('data', updateMap);
        scope.$watch('trigger', updateMap);
      }
    };
  });
