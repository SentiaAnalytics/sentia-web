'use strict';

angular.module('charts', [])
  .directive('linechart', require('./linechart'))
  .directive('barchart', require('./barchart'));
