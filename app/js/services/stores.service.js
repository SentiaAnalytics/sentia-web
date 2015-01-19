var moment = require('moment'),
  lodash = require('lodash');
module.exports = function($http, PosService) {
  'use strict';
  this.read = function (id) {
    return $http.get('/api/stores/' + id)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };
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
          lte : 23
        }
      },
      groupBy : ['step'],
      orderBy : {
        step : true
      }
    };
    return PosService.get(query)
      .then(function(data) {
        return processPosChartData(data);

      });
  };

  function processPosChartData (data) {
    // There might be holes in our input data (if values are 0)
    var range = lodash.range(9, 23);
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
