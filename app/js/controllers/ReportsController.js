/**
* login controller
* @author Andreas
* @date   2014-04-11
*/
var moment = require('moment');
module.exports = function($scope, $routeParams,  ReportsService) {
  'use strict';
  document.title = 'Sentia - Store';
  $scope.date = new Date();
  $scope.store = {
    _id :$routeParams.id
  };
  $scope.charts = {
    options : {
      range : getDateRange(),
      hoverCallback : function (index, options, content, row) {
        return '<span class="caps">' + row.x +'. ' + moment($scope.date).format('MMMM')+'</span>|<span class="text-primary"> ' + row.y + '</span>';
      }

    },
    revenue : {},
      transactions : {},
      people : {}
  };


  $scope.$watch('date', updateReport);

  function getDateRange () {
    var i,
      max = moment($scope.date).daysInMonth(),
      range = [];

    for (i = 1; i <= max; i += 1) {
      range.push(i);
    }
    return range;
  }

  function updateReport() {
    $scope.charts.range = getDateRange();
    updateRevenue();
    updateTransactions();
  }

  function updateRevenue () {
    if (!$scope.store) {
      return;
    }
    ReportsService.getTotalRevenue($scope.store._id, $scope.date)
      .then(function (total) {
        $scope.charts.revenue.total = total;
      });
  }

  function updateTransactions () {
    if (!$scope.store) {
      return;
    }

    ReportsService.getTotalTransactions($scope.store._id, $scope.date)
      .then(function (total) {
        $scope.charts.transactions.total = total;
      });
  }
  mixpanel.track('page viewed', {
    'page': document.title,
    'url': window.location.pathname,
    controller: 'ReportController',
    store : $scope.store._id
  });
};
