/**
* login controller
* @author Andreas
* @date   2014-04-11
*/
var moment = require('moment');
module.exports = function($scope, $routeParams,  Report) {
  'use strict';
  document.title = 'Sentia - Store';
  $scope.date = new Date();
  $scope.store = $routeParams.id;


  $scope.$watch('date', updateReport);

  function updateReport() {
    getPos();
  }

  function getPos () {
    if (!$scope.store) {
      return;
    }
    Report.getPos({store: $scope.store, date: $scope.date})
    .then(function(data) {
      var revenue = [], transactions = [], i,total_revenue = 0, total_transactions = 0;
      if(data.length === 0) {
        return;
      }
      for (i = 0; i < 24; i += 1) {
        revenue.push(0);
        transactions.push(0);
      }

      data.forEach(function (e) {
        total_transactions += Number(e.transactions);
        total_revenue += Number(e.revenue);
        transactions[e.hour] = Number(e.transactions);
        revenue[e.hour] = Number(e.revenue);
      });
      total_revenue = Math.round(total_revenue * 100) / 100;
      $scope.pos = {
        totalTransactions : total_transactions,
        totalRevenue : total_revenue,
        revenue : {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
            '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [{
            label: "In",
            fillColor: "#90CCFF",
            strokeColor: "#36a3ff",
            pointColor: "#36a3ff",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: revenue
          }]
        },
        transactions : {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
            '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [{
            label: "Out",

            fillColor: "#F7CB8F",
            strokeColor: "#f0ad4e",
            pointColor: "#f0ad4e",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: transactions
          }]
        }
      };
    });
  }
  mixpanel.track('page viewed', {
    'page': document.title,
    'url': window.location.pathname,
    controller: 'StoreCtrl',
    store : $scope.store._id
  });
};
