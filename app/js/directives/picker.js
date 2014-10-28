/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
require('../bower_components/pickadate/lib/picker.js');
require("../bower_components/pickadate/lib/picker.date.js");
require("../bower_components/pickadate/lib/picker.time.js");
var moment = require('moment');
var $ = require('jquery');
angular.module('picker', [])
  .directive('picker', function() {
    'use strict';
    return {
      template: '<button class="btn icon-chevron-left" ng-click="prevDate()"></button><input/><button class="btn icon-chevron-right"></button>',
      restrict: 'E',
      scope: {
        date: '='
      },
      link: function postLink(scope, element) {
        var $input = $(element.find('input')).pickadate({clear : false, onSet: function() {
            if (!picker.get('select')) { 
              return;
            }
            var newDate = moment(picker.get('select').obj)
              .toDate();
            if (scope.date.getTime() === newDate.getTime()) {
              console.log('date not updated');
              return;
            }
            scope.$apply(function () {
              scope.date = newDate;
            });
          }
        });
        var picker = $input.pickadate('picker');
        picker.set('select', scope.date);
        picker.set('max', new Date());
        scope.$watch('date', function () {
          picker.set('select', scope.date);
        });
        scope.prevDate = function () {
          console.log('PREV DATE');
          scope.$apply(function () {
            scope.date = moment(scope.date)
            .remove(1, 'day')
            .toDate();
          });
        };
        scope.nextDate = function () {
          console.log('NEXT DATE');
          scope.$apply(function () {
            scope.date = moment(scope.date)
            .add(1, 'day')
            .toDate();
          });
        };
      }

    };
  });
