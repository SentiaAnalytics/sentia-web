'use strict';
var chartist = require('chartist');
var $ = require('jquery');
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
  var dummydata = {
      // A labels array that can contain any sort of values
      labels: [0],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [0]
      ]
    };
  element.addClass('ct-chart');
  draw();
  $element.append('<div class="loader"></div>');
  $scope.$watch('data', update);
  $scope.$watch('trigger', update);

  function draw () {
    $element.find('*').remove();
    chart = new chartist.Bar($element[0], dummydata, $scope.options);
    addTooltip();
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

  function update () {
    if (!chart || !chart.optionsProvider) {
      return;
    }
    if (!$scope.data) {
      $element.find('.loader').show();
      chart.update(dummydata);
      return;
    }
    $element.find('.loader').hide();
    chart.update($scope.data);

  }
}
