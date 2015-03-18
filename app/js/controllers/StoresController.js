/**
 * login controller
 * @author Andreas
 * @date   2014-04-11
 */
module.exports = function($scope, $q, StoresService, CamerasService, PosService, PeopleService, $routeParams, $location) {
  'use strict';
  var moment = require('moment');
  var lodash = require('lodash');
  var $parent = $scope.$parent; // shorthand

  //bindables
  $scope.store = null;
  $scope.cameras = null;
  $scope.activeTab = Number($routeParams.activeTab) || 1;
  $scope.selectTab = selectTab; // function
  $scope.selectCamera = selectCamera; //function
  $scope.setSelectedCam = setSelectedCam;
  $scope.charts = {
    options : {
      range : [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    BarOptions : {
    },
    churn: {
      data : {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
        series: [
          [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
        ]
      }
    }
  };

  // setup
  document.title = 'Sentia - Store';
  updateUrl();
  init($routeParams);// get the store and build the $scope

  function setSelectedCam (cam) {
    $scope.selectedCam = cam;
  }
  function init (params) {
    return $q.when(params.storeId)
      .then(getStore)
      .then(getCameras)
      .then(watch)
      .then(function () {
        mixpanel.track('page viewed', {
          'page': document.title,
          'url': window.location,
          controller: 'StoreController',
          store : $scope.store._id
        });
      });
  }

  function updateUrl () {
    $location.replace();
    $location.search('activeTab', $scope.activeTab);
    $location.search('startDate', moment($scope.$parent.startDate).format('YYYY-MM-DDTHH:mm:ss.00Z'));
    $location.search('endDate', moment($scope.$parent.endDate).format('YYYY-MM-DDTHH:mm:ss.00Z'));
  }

  function getStore (id) {
    return StoresService.getSelectedStore(id)
      .then(function (store) {
        $scope.store = store;
        return store;
      });
  }

  function getCameras (store) {
    return CamerasService.get({where : {store : store._id}})
      .then(function(cameras) {
        $scope.cameras = cameras;
        return cameras;
      });
  }
  // initiate watchers for the controller
  function watch () {
    $parent.$watch('startDate', onDateChange);
    $parent.$watch('endDate', onDateChange);
  }
  function onDateChange () {
    updateUrl();
    updateDashboard();
    mixpanel.track('date changed', {
      page : document.title,
      controller : 'StoreCtrl',
      store : $scope.store._id,
      selected_date : $parent.startDate.toString(),
      url : window.location
    });
  }

  // function definitions
  function selectTab (tab) {
    $location.search('activeTab', tab);
    $scope.activeTab = tab;
    mixpanel.track('switched tab', {
      page : document.title,
      controller: 'StoreCtrl',
      store : $scope.store._id,
      tab : $scope.activeTab,
      url : window.location
    });
  }


  function selectCamera (cam) {
    $parent.camera = cam;
    $scope.$root.go('/store/camera/' + cam._id, 'animate-scale');
  }


  function updateDashboard () {
    var promises = [];
    // reset
    $scope.charts = {};
    // if no store object is present, return;
    if (!$scope.store) {
      return;
    }
    updateTotals();
    updateChurnData();
    updatePeopleChart();
    updatePosCharts();

    // Conversion Charts requires both pos and people charts
    // promises.push(updatePosCharts());
    // promises.push(updatePeopleCharts());
    // $q.all(promises)
    //   .then(updateConversionCharts);

  }

  function updateTotals () {
    $scope.totalRevenue = null;
    $scope.totalTransactions = null;
    $scope.totalPeopleIn = null;
    updateTotalPeopleIn();
    updatePosTotals();
  }

  function updateTotalPeopleIn () {
    var query = {
      startDate: $parent.startDate,
      endDate: $parent.endDate,
      cameras: $scope.cameras.reduce(function (cameras, cam) {
        if (cam.counter === 'entrance') {
          cameras.push(cam._id);
        }
        return cameras;
      },[])
    };

    PeopleService.getTotalPeopleIn(query)
      .then(function (totalPeopleIn) {
          $scope.totalPeopleIn = totalPeopleIn;
      });
  }

  function updatePosTotals () {
    var query = {
      startDate: $parent.startDate,
      endDate: $parent.endDate,
      storeId: $scope.store._id
    };

    PosService.getPosTotals(query)
      .then(function (posTotals) {
        $scope.totalRevenue = posTotals.revenue;
        $scope.totalTransactions = posTotals.transactions;
      });
  }

  function updateChurnData () {
    $scope.churnRateData = null;

    var query = {
      startDate: $parent.startDate,
      endDate: $parent.endDate,
      cameras: $scope.cameras.reduce(function (cameras, cam) {
          if (cam.hasOwnProperty('counter')) {
            cameras.push(cam._id);
          }
          return cameras;
      },[])
    };
    return PeopleService.getChurnRateData(query)
      .then(addCameraNamesToChurnData)
      .then(sortChurnRateData)
      .then(convertDataToChartFormat)
      .then(updateViewModel);

    function addCameraNamesToChurnData (data) {
      if (!data) {
        return $q.reject('No Churn Data');
      }
      data = data.map(function (dataPoint) {
        //return the name of the camera from the id
        var cam = lodash.find($scope.cameras, function (camera) {
          return camera._id === dataPoint.cam;
        });
        dataPoint.name = cam ? cam.name: 'unknown';
        return dataPoint;
      });
      return data;
    }

    function sortChurnRateData (data) {
        return data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          return -1
        });
    }

    function convertDataToChartFormat (data) {
      var labels = [];
      var values = [];

      data.forEach(function (e) {
          labels.push(e.name);
          values.push(Number(e.people));
      });
      return {
        labels: labels,
        series : [values]
      };
    }

    function updateViewModel (data) {
      $scope.churnRateData = data;
    }

  }

  function updatePosCharts() {
    var query = {
      storeId: $scope.store._id,
      startDate: $parent.startDate,
      endDate: $parent.endDate
    };
     return PosService.getPosCharts(query)
     .then(function (data) {
       $scope.revenueData = data.revenue;
       $scope.transactionsData = data.transactions;
     });
  }

  function updatePeopleChart () {
    $scope.peopleInData = null;
    var query = {
      startDate: $parent.startDate,
      endDate: $parent.endDate,
      cameras: $scope.cameras.reduce(function (cameras, cam) {
        if (cam.counter === 'entrance') {
          cameras.push(cam._id);
        }
        return cameras;
      },[])
    };
    return PeopleService.getLineChart(query)
      .then(function (data) {
        $scope.peopleInData = data;
     });
  }



  function updateConversionCharts () {
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
