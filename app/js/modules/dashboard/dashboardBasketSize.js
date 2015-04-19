'use strict';
var moment = require('moment');
var P = require('bluebird');
module.exports = function() {
  return {
    template: '{{basketSize | waiting | dkNumber : 2}}',
    restrict: 'EA',
    // require: '^dashboard',
    controller: controller,
    scope: {
      options: '='

    }
  };
};
controller.$inject = ['$scope','PosService'];
function controller ($scope, posService) {
  $scope.basketSize = 100;
  $scope.$watch('options', update);

  function update (options) {
    P.resolve(options)
      .then(buildQuery)
      .then(posService.get)
      .then(setBasketSize);
  }
  function buildQuery (options) {
    return {
      fields : {
        'sum(revenue) / sum(transactions)' : 'basketSize'
      },
      where : {
        store : options.store._id,
        'date(time)' : {
          gte : moment(options.startDate)
            .format('YYYY-MM-DD'),
          lte : moment(options.endDate)
            .format('YYYY-MM-DD'),
        }
      }
    };
  }
  function setBasketSize (data) {
    $scope.basketSize = Number(data[0].basketSize);
  }
}
