'use strict';
var chartist = require('chartist');
var $ = require('jquery');
var defaults = {
  height: 250,

  axisY: {
    labelInterpolationFnc: function (val) {
        if (val > 1000000) {
          return Math.round(val/10000) / 100 + 'M';
        }
        if (val > 10000) {
          return Math.round(val/100) / 100 + 'K';
        }
    }
  }
};
module.exports = function() {
  return {
    template: '',
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
      trigger: '='
    },
    link: link
  };
};

function link($scope, element) {
  var chart;
  var $element = $(element[0]);
  var options = angular.extend({}, $scope.options, defaults);
  element.addClass('ct-chart');
  render();
  $scope.$watch('data', render);
  $scope.$watch('trigger', render);

  function render () {
    $element.find('*').remove();
    if (!$scope.data) {
      showLoader();
      return;
    }
    if ($scope.data.labels && $scope.data.labels.length > 0) {
      chart = new chartist.Bar($element[0], $scope.data, options);
      addTooltip();
    }
  }

  function showLoader () {
    $element.append('<div class="loader"></div>');
  }

  function addTooltip() {
    var $toolTip = $element
      .append('<div class="ct-tooltip"></div>')
      .find('.ct-tooltip')
      .hide();
    $element.on('mouseenter', '.ct-bar', function() {
      var $bar = $(this),
        value = $bar.attr('ct:value');

      $bar.animate({
        'stroke-width': '80px'
      }, 200, easeOutQuad);
      $toolTip
        .html(value)
        .show()
        .css({
          left: Number($bar.attr('x2')) - $toolTip.width() / 2 - 5,
          top: Number($bar.attr('y2')) - $toolTip.height() - 35
        });
    });

    $element.on('mouseleave', '.ct-bar', function() {
      var $bar = $(this);
      $bar.animate({
        'stroke-width': '65px'
      }, 200, easeOutQuad);
      $toolTip.hide();
    });
  }

  function easeOutQuad(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }
}
