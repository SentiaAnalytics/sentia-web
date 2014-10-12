/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */

module.exports = function($scope, Store, Cam) {
  'use strict';
  $scope.$root.showHeader = true;
  $scope.$root.page = 'store';
  $scope.currentTab = 2;
  $scope.selectTab = function (tab) {
    $scope.currentTab = tab;
  };
  $scope.date = new Date();
  $scope.store =  {
    _id : '54318d4064acfb0b3139807e'
  };
    
  Store.read($scope.store._id)
    .then(function (store) {
      $scope.store = store;
    });
  Cam.find($scope.store._id)
    .then(function(cameras) {
      $scope.cameras = cameras;
    });
  $scope.selectCamera = function(cam) {
    Cam.selectedCam = cam;
    $scope.$root.go('/store/camera/' + cam._id, 'animate-scale');
  };
  
  function getPos () {
    if (!$scope.store) {
      return;
    }
    Store.getPos({store: $scope.store._id, date: $scope.date})
      .then(function(data) {
        var revenue = [], transactions = [], i,total_revenue = 0, total_transactions = 0;
        for (i = 0; i < 24; i += 1) {
          revenue.push(0);
          transactions.push(0);
        }

        data.forEach(function (e) {
          if (data[i].type === ' Betaling') {
            total_transactions += data[i].transactions;
            total_revenue += (data[i].amount * -1);
          }
          total_revenue += Number(e.revenue);
          total_transactions += Number(e.transactions);
          transactions[e.hour] = e.transactions;
          revenue[e.hour] = e.revenue; 
        });
        $scope.pos = {
          total_transactions : total_transactions,
          total_revenue : total_revenue,
          revenue : {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
  $scope.$watch('date', function() {
    getPos();
  });
  getPos();
};
