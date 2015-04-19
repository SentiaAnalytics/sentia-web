'use strict';
var moment = require('moment');
var P = require('bluebird');
module.exports = function() {
  return {
    template: '{{revenue | waiting | dkNumber : 2}}',
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
  $scope.revenue = 100;
  $scope.$watch('options', update);


  function update (options) {
    P.resolve(options)
      .then(buildQuery)
      .then(posService.get)
      .then(setRevenue);
  }
  function buildQuery (options) {
    return {
      fields : {
        'sum(revenue)' : 'revenue'
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
  function setRevenue (data) {
    $scope.revenue = Number(data[0].revenue);
  }
}
