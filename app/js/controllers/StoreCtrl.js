/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
var moment = require('moment');
module.exports = function($scope, Store, Cam) {
  'use strict';
  document.title = 'Sentia - Store';
 
  $scope.$root.showHeader = true;
  $scope.$root.page = 'store';
  $scope.currentTab = 2;
  $scope.selectTab = function (tab) {
    $scope.currentTab = tab;
  };
  // $scope.date = new Date('2014-09-01');
  $scope.date = moment.utc()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .millisecond(0)
    .toDate();
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
          total_transactions += Number(e.transactions);
          transactions[e.hour] = Number(e.transactions);
          revenue[e.hour] = Number(e.revenue); 
        });
        total_revenue = Math.round(total_revenue * 100) / 100;
        $scope.pos = {
          totalTransactions : total_transactions,
          totalRevenue : total_revenue,
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
    console.log('DATE CHANGED');
    getPos();
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'StoreCtrl',
      store : $scope.store.id,
      date : $scope.date
    });
  });

  $scope.$watch('currentTab', function () {
    mixpanel.track('switched tab', {
      page : document.title,
      controller: 'StoreCtrl',
      store : $scope.store.id,
      tab : $scope.currentTab
    });
  })
  // getPos();

  mixpanel.track('page viewed', {
    'page': document.title,
    'url': window.location.pathname,
    controller: 'StoreCtrl',
    store : $scope.store._id
  });
};
