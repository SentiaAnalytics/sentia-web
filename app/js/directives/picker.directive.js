/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
console.log(window.jQuery);
require('pickadate');
var moment = require('moment');
require('jquery');
angular.module('picker', [])
  .directive('picker', function() {
    'use strict';
    return {
      template: '<button class="btn btn-default icon-chevron-left" ng-click="prevDate()"></button><input class="btn btn-default" disabled/><button class="btn btn-default icon-chevron-right" ng-click="nextDate()"></button>',
      restrict: 'E',
      scope: {
        date: '=date'
      },
      link: function postLink(scope, element) {
        element.addClass('btn-group');
        var options = {
          autoclose: true,
          endDate : moment.utc()
            .hours(0)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .toDate(),
          format : 'dd/mm/yyyy'
        };
        var $input = window.jQuery(element.find('input'));
        $input.datepicker(options).on('changeDate', function (e) {
          scope.$apply(function () {
            scope.date = e.date;
          });
        });

        scope.prevDate = function () {
           var date = moment(scope.date)
            .subtract(1, 'day')
            .toDate();
          if (date <= options.endDate) {
            scope.date = date;
          }

        };
        scope.nextDate = function () {
          var date = moment(scope.date)
            .add(1, 'day')
            .toDate();
          if (date <= options.endDate) {
            scope.date = date;
          }
        };
        scope.$watch('date', function () {
          $input.datepicker('update', scope.date);
        });
      }

    };
  });
