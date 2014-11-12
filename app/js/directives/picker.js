/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
console.log(window.jQuery);
require('../bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js');
var moment = require('moment');
var $ = require('jquery');
angular.module('picker', [])
  .directive('picker', function() {
    'use strict';
    return {
      template: '<button class="btn btn-default icon-chevron-left" ng-click="prevDate()"></button><input class="btn btn-default"/><button class="btn btn-default icon-chevron-right" ng-click="nextDate()"></button>',
      restrict: 'E',
      scope: {
        date: '=date'
      },
      link: function postLink(scope, element) {
        element.addClass('btn-group');
        var $input = window.jQuery(element.find('input'));
        var datepicker = $input.datepicker({
          autoclose: true
        }).on('changeDate', function (e) {
          scope.$apply(function () {
            scope.date = e.date;
          });
        });

        scope.prevDate = function () {
          scope.date = moment(scope.date)
            .subtract(1, 'day')
            .toDate(); 

        };
        scope.nextDate = function () {
          scope.date = moment(scope.date)
            .add(1, 'day')
            .toDate(); 
        }
        scope.$watch('date', function () {
          $input.datepicker('update', scope.date);
        });
      }

    };
  });
