module.exports = function($http) {
  'use strict';
  var lodash = require('lodash');
  var moment = require('moment');
  // ## Get pos data
  // Takes a json2sql query object
  this.get = function (query) {
    return $http.get('/api/pos?json=' +JSON.stringify(query))
      .then(function(response) {
        return response.data || undefined;
      })
      .catch (function(error) {
        return error;
      });
  };

  this.getPosTotals = function (query) {
    var json = {
      fields : {
        'sum(amount)' : 'revenue',
        'count(distinct(salesno))' : 'transactions'
      },
      where : {
        store : query.storeId,
        type : 'Item',
        'starttime' : {
          gt : moment(query.startDate)
            .format('YYYY-MM-DD HH:mm:ss'),
          lte : moment(query.endDate)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
        },
        'hour(starttime)' : {
          gte : 9,
          lte : 20
        }
      }
    };
    return this.get(json)
    .then(function(data) {
      return {
        revenue: data[0].revenue,
        transactions: data[0].transactions
      };
    });
  };
  // helper functions
  this.getPosCharts = function (query) {
    var json = {
      fields : {
        'sum(amount)' : 'revenue',
        'count(distinct(salesno))' : 'transactions',
        'hour(starttime)' : 'step'
      },
      where : {
        store : query.storeId,
        type : 'Item',
        'starttime' : {
          gt : moment(query.startDate)
            .format('YYYY-MM-DD HH:mm:ss'),
          lte : moment(query.endDate)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
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
    return this.get(json)
    .then(function(data) {
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
    var transactionData = [],
    revenueData = [];

    range.forEach(function (i) {
      //body
      if (!temp[i]) {
        temp[i] = {revenue : 0, transactions : 0};
      }

      // push dataset to appropriate array
      revenueData.push(Math.round(Number(temp[i].revenue) * 100)/100);
      transactionData.push(Math.round(Number(temp[i].transactions)));
    });
    return {
      revenue : {
        labels : range,
        series : [revenueData]
      },
      transactions : {
        labels : range,
        series : [transactionData]
      }
    };
  }


};
