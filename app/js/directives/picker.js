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
      template: '<input/>',
      restrict: 'E',
      scope: {
        date: '='
      },
      link: function postLink(scope, element) {
        var $input = $(element.find('input')).pickadate({onSet: function() {
            scope.date = moment(picker.get('select').obj);
            scope.$apply();
            console.log(scope.date);
          }
        });
        var picker = $input.pickadate('picker');
        picker.set('select', scope.date);
        scope.watch('date', function () {
          picker.set('select', scope.date);
        });
      }

    };
  });
