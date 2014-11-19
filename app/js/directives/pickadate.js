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
          editable: false,
          max: true
        });

        picker = $input.pickadate('picker');
        picker.set('select', scope.date);
        picker.on('set', function () {
          scope.$apply(function () {
            console.log('set');
            scope.date = moment(picker.get('select')).toDate();
            console.log(scope.date.toString());
          });
        });
        scope.controls = {
          next : function () {
            console.log('right');
            var date = moment(scope.date).add(1, 'day');
            console.log(date);
            if (!date.isAfter(moment(), 'day')) {
              scope.date = date.toDate();
            }
          },
          prev : function () {
            var date = moment(scope.date).subtract(1, 'day');
            scope.date = date.toDate();
          }
        }


        scope.$watch('date', function (newDate) {
          console.log('watch');
          console.log(newDate);
          console.log(scope.date.toString());
          if (!moment(newDate).isSame(moment(picker.get('select')))) {
            picker.set('select', newDate, {muted : true});
          }
        });


      }

    };
  });
