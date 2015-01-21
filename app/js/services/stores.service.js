var moment = require('moment'),
  lodash = require('lodash');
module.exports = function($http, $q, PosService) {
  'use strict';

  var selectedStore = null; // serves as a model
  var stores = null; // list of stores in the company

  this.getSelectedStore = function (id) {
    if (id) {
      if (selectedStore && selectedStore._id === id) {
        return $q.when(selectedStore);
      }
      return this.read(id)
        .then(function (store) {
          selectedStore  = store;
          return store;
        });
    }
    // until we get a company landing page with list of stores
    // we will just use the first store
    return this.get()
      .then(function (stores) {
        selectedStore  = stores[0];
        return stores[0];
      });
  };

  this.setSelectedStore = function (store) {
    if (store) {
      selectedStore = store;
    }
    return this;
  };

  this.getStores = function () {
    if (stores) {
      return $q.when(stores);
    }
    return this.get()
      .then(function (stores) {
        stores = stores;
        return stores;
      });
  };


  // get a specific store by id
  this.read = function (id) {
    return $http.get('/api/stores/' + id)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // Get a list of stores
  this.get = function () {
    return $http.get('/api/stores')
      .then(function (res) {

        return res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };


  // helper functions
  this.getPosCharts = function (storeId, date) {
    var query = {
      fields : {
        'sum(amount)' : 'revenue',
        'count(distinct(salesno))' : 'transactions',
        'hour(starttime)' : 'step'
      },
      where : {
        store : storeId,
        type : 'Item',
        'starttime' : {
          gt : moment(date)
            .format('YYYY-MM-DD'),
          lte : moment(date)
            .add(1, 'day')
            .format('YYYY-MM-DD')
        },
        'hour(starttime)' : {
          gte : 9,
          lte : 20
        }
      },
      groupBy : ['step'],
      orderBy : {
        step : true
      }
    };
    return PosService.get(query)
      .then(function(data) {
        console.log(data);
        return processPosChartData(data);
      });
  };

  function processPosChartData (data) {
    // There might be holes in our input data (if values are 0)
    var range = lodash.range(9, 21); // this gets translated to +1
    // build temp array for easy access to data
    var temp = data.reduce(function (arr, item) {
        arr[item.step] = item;
        return arr;
      }, []);
    var totalTransactions = 0,
      totalRevenue = 0,
      transactionData = [],
      revenueData = [];

    range.forEach(function (i) {
      //body
      if (!temp[i]) {
        temp[i] = {revenue : 0, transactions : 0};
      }
      totalRevenue += Number(temp[i].revenue);
      totalTransactions += Number(temp[i].transactions);

      // push dataset to appropriate array
      revenueData.push(Math.round(Number(temp[i].revenue) * 100)/100);
      transactionData.push(Math.round(Number(temp[i].transactions)));
    });
    return {
      revenue : {
        total : Math.round(totalRevenue * 100) / 100,
        data : {
          labels : range,
          series : [revenueData]
        }
      },
      transactions : {
        total : totalTransactions,
        data : {
          labels : range,
          series : [transactionData]
        }
      }
    };
  }
};
