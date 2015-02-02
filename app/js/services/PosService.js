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
        console.log(error);
        return error;
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
    return this.get(query)
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
