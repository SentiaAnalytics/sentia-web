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
      output = {
        revenue : {
          total : 0,
          data :[]
        },
        transactions : {
          total : 0,
          data :[]
        }

      };

    range.forEach(function (i) {

      // fill 0 where we are missing data
      if (!temp[i]) {
        temp[i] = {revenue: 0, transactions: 0};
      }
      // update totals
      output.revenue.total += Number(temp[i].revenue);
      output.transactions.total += Number(temp[i].transactions);

      // push dataset to appropriate array
      output.revenue.data.push({
        x : i,
        y : Math.round(Number(temp[i].revenue) * 100)/100
      });
      output.transactions.data.push({
        x : i,
        y : Math.round(Number(temp[i].transactions))
      });
    });
    // round off total
    output.revenue.total = Math.round(output.revenue.total * 100) / 100;

    return output;

  };
};

