  /**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
var moment = require('moment');
var $ = require('jquery');
require('../../bower_components/pickadate/lib/picker.js');
require('../../bower_components/pickadate/lib/picker.date.js');
angular.module('pickadate', [])
  .directive('pickadate', function() {
    'use strict';
    return {
      template: '<button class="btn btn-default icon-chevron-left" ng-click="controls.prev()"></button><input class="btn btn-default"><button class="btn btn-default icon-chevron-right" ng-click="controls.next()"></button>',
      restrict: 'E',
      scope: {
        date: '=date'
      },
      link: function postLink(scope, element) {
        var $input, picker;
        element.addClass('btn-group');
        $input = $(element.find('input')).pickadate({
          today:false,
          clear : false,
          close: false,
          // editable: false,
          max: true,
          min : false

        });

        picker = $input.pickadate('picker');
        picker.set('select', scope.date);
        picker.on('set', function (value) {
          if(!value.select) {
            return;
          }
          scope.$apply(function () {
            scope.date = moment(picker.get()).toDate();
          });
        });
        scope.controls = {
          next : function () {
            var date = moment(scope.date).add(1, 'day');
            if (!date.isAfter(moment(), 'day')) {
              scope.date = date.toDate();
            }
          },
          prev : function () {
            var date = moment(scope.date).subtract(1, 'day');
            scope.date = date.toDate();
          }
        };


        scope.$watch('date', function (newDate) {
          if (!moment(newDate).isSame(moment(picker.get()))) {
            picker.set('select', newDate, {muted : true});
          }
        });


      }

    };
  });
