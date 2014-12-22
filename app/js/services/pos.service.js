module.exports = function($http) {
  'use strict';
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
  this.processRevenueData = function (input, range) {
    // There might be holes in our input data (if values are 0)

    // build temp array for easy access to data
    var temp = input.reduce(function (arr, item) {
        arr[item.step] = item;
        return arr;
      }, []),
     totalTransactions = 0,
     totalRevenue = 0,
     transactionData = [],
     revenueData = [];

    range.forEach(function (i) {

      // fill 0 where we are missing data
      if (!temp[i]) {
        temp[i] = {revenue: 0, transactions: 0};
      }
      // update totals
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

  };
};

