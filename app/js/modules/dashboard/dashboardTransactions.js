'use strict';
var moment = require('moment');
var P = require('bluebird');
module.exports = function() {
  return {
    template: '{{transactions | waiting | dkNumber : 2}}',
    restrict: 'EA',
    controller: controller,
    scope: {
      options: '='

    }
  };
};
controller.$inject = ['$scope','PosService'];
function controller ($scope, posService) {
  $scope.transactions = 100;
  $scope.$watch('options', update);


  function update (options) {
    P.resolve(options)
      .then(buildQuery)
      .then(posService.get)
      .then(setTransactions);
  }
  function buildQuery (options) {
    return {
      fields : {
        'sum(transactions)' : 'transactions'
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
  function setTransactions (data) {
    $scope.transactions = Number(data[0].transactions);
  }
}
