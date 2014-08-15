/*jslint browser:true, nomen:true*/
/*global angular:true, $:true, console: false*/
angular.module('app')
	.filter('heatfilter', [function () {
		'use strict';
		return function (input, scale) {
			var i, output;
			if (!input || !input.data) {
				return;
			}
			output  = angular.extend({}, input);
			output.cols = output.cols * scale;
			output.rows = output.rows * scale;
			output.data = [];
			for (i = 0; i < input.data.length; i += 1) {
				output.data.push([input.data[i].x * scale, input.data[i].y* scale, input.data[i].heat]);
			}
			return output;

		};
	}]);