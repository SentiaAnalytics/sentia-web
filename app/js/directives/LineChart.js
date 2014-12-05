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
        trigger : '='
      },
      link: function postLink($scope, element) {
        var linechart;
        $scope.$watch('data', draw);
        $scope.$watch('trigger', draw);

        function draw() {
          if (!$scope.data) {
            return;
          }
          element.find('*').remove();

          var options = {
            element : element[0],
            data : parseData($scope.data),
            xkey : 'x',
            ykeys : ['y'],
            labels : $scope.data.labels,
            lineColors : ['#36a3ff'],
            dateFormat : function () {return ''},
            hoverCallback: function (index, options, content, row) {
              return row.x + ':00 - ' + row.y;
            },
            xLabelFormat : function (x) {
              return '' + x + ':00';
            }
          }

         Morris.Area(options);
        }
      }
    };
    function parseData (data) {
      var res = [],
        i;
      for (i = 0; i < data.labels.length; i += 1) {
        res.push({
          x : Number(data.labels[i]),
          y : data.datasets[0].data[i]
        });
      }
      return res;
    } 
  });
