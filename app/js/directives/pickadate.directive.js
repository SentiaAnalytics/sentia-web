  /**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
angular.module('pickadate', [])
  .directive('pickadate', function() {
    'use strict';
    var _ = require('lodash');
    var moment = _.partialRight(require('moment-timezone').tz, 'Europe/Copenhagen');
    var $ = require('jquery');
    require('../../bower_components/pickadate/lib/picker.js');
    require('../../bower_components/pickadate/lib/picker.date.js');
    return {
      template: '<div class="btn-group"><button class="btn btn-primary icon-chevron-left hidden-xs" ng-click="controls.prev()"></button><input class="btn btn-primary hidden-xs"><button class="btn btn-primary hidden-xs icon-chevron-right" ng-click="controls.next()"></button></div><button class="hidden-sm hidden-md hidden-lg btn btn-primary btn-icon" ng-click="open($event)" style="border-radius:4px;"><i class="icon-calendar" ></i></button>',
      restrict: 'E',
      scope: {
        date: '=date',
        show : '=show',
        from : '=from',
        to : '=to',
      },
      link: function postLink(scope, element) {
        var $input, picker;
        $input = $(element.find('input')).pickadate({
          today:false,
          clear : false,
          close: false,
          format : 'd mmm',
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
            scope.date = moment(value.select);
          });
        });
        scope.controls = {
          next : function () {
            var date = moment(scope.date).add(1, 'day');

            var to = scope.to || new Date();
            if (date.isAfter(to)) {
              return;
            }
            scope.date = date;
          },
          prev : function () {
            var date = moment(scope.date).subtract(1, 'day');
            if (scope.from && !date.isBefore(scope.from)) {
              return;
            }
              scope.date = date;
          }
        };

        scope.open = function () {
          setTimeout(function () {
              picker.open();
          },0);
        };
        scope.$watch('date', function (newDate) {
          if (!moment(newDate).isSame(moment(picker.get()))) {
            picker.set('select', newDate.toDate(), {muted : true});
          }
        });
        scope.$watch('from',function (from) {
          if (from) {
            picker.set('min', from.toDate());
            picker.set('max', new Date()  );
          }
        });
        scope.$watch('to',function (to) {
          if (to) {
            picker.set('max', to.toDate());
          }
        });


      }

    };
  });
