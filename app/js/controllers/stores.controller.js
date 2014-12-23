/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
var moment = require('moment');
module.exports = function($scope, StoreService, CamService, PosService, PeopleService, $routeParams, $location) {
  'use strict';
  var $parent = $scope.$parent; // shorthand

  //bindables
  $scope.activeTab = Number($routeParams.activeTab) || 1;
  

  $scope.charts = {
    options : {
      range : [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    BarOptions : {
      axisX :{
        labelOffset : {
          x : '50%'
        }
      }
    }
  };


  // temporarily hardcoded
  $parent.store =  {
    _id : '54318d4064acfb0b3139807e'
  };

  $scope.selectTab = selectTab; // function
  $scope.selectCamera = selectCamera; //function

  //setup
  document.title = 'Sentia - Store';
  $location.search('activeTab', $scope.activeTab);
  $location.search('date', moment($scope.$parent.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));
  if (!$parent.store) {
    StoreService.read($routeParams.storeId)
      .then(function (store) {
        $parent.store = store;
      });
  }

  CamService.find($parent.store._id)
    .then(function(cameras) {
      $parent.store.cameras = cameras;
    });

  // watch
  $parent.$watch('date', function() {
    $location.replace();
    $location.search('date', moment($parent.date).format('YYYY-MM-DDTHH:mm:ss.00Z'));
    getPos();
    getPeople();
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'StoreCtrl',
      store : $parent.store._id,
      date : $parent.date
    });
  });

  $scope.$watch('charts', getConversionChart, true);

  mixpanel.track('page viewed', {
    'page': document.title,
    'url': window.location.pathname,
    controller: 'StoreController',
    store : $parent.store._id
  });
 

 // function definitions
  
  function selectTab (tab) {
    $location.search('activeTab', tab);
    $scope.activeTab = tab;
    mixpanel.track('switched tab', {
      page : document.title,
      controller: 'StoreCtrl',
      store : $parent.store._id,
      tab : $scope.activeTab
    });
  }


  function selectCamera (cam) {
    $parent.camera = cam;
    $scope.$root.go('/store/camera/' + cam._id, 'animate-scale');
  }


  function getPos () {
    $scope.charts.revenue = null;
    $scope.charts.transactions = null;
    $scope.charts.conversion = null;
    if (!$parent.store) {
      return;
    }
    StoreService.getPosCharts($parent.store._id, $parent.date)
      .then(function (data) {
        $scope.charts.revenue = data.revenue;
        $scope.charts.transactions = data.transactions;

      });
  }

  function getPeople () {
    $scope.charts.people = null;
    $scope.charts.peoplein = null;
    $scope.charts.conversion = null;

    // TODO enable when cameras has propernames.

    // PeopleService.getBarchart($parent.date)
    //   .then(function (data) {
    //     if (!data) {return;}
    //     $scope.charts.people = {
    //       total : data.series[0] ? data.series[0][0] : 0,
    //       data : data
    //     };
    //   });

    PeopleService.getLineChart('543197b8ab3de09c344bc1e7', $parent.date)
      .then(function (data) {
        if (!data) {return;}
        var total = data
          .series[0]
          .reduce(function (sum, val) {
              return sum + val;
            },0);
        $scope.charts.people = {
          total : total,
          data : data
        };
      });
  }
  function getConversionChart () {
    $scope.charts.conversion = null;
    if (!$scope.charts.transactions || !$scope.charts.people) {
      return;
    }
    var data = $scope.charts.transactions.data.series[0].map(function (val, i) {
        if (val && $scope.charts.people.data.series[0][i]) {
          return Math.round(val / $scope.charts.people.data.series[0][i]* 10000)/ 100;
        } 
        return 0;
      });
    $scope.charts.conversion = {
      total : Math.round(($scope.charts.transactions.total / $scope.charts.people.total) * 10000) / 100,
      data :  {
        labels : $scope.charts.transactions.data.labels,
        series : [data]
      }
    };

  }
};

