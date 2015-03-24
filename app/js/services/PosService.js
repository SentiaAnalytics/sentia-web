module.exports = function($http) {
  'use strict';
  var _ = require('lodash');
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
        'sum(revenue)' : 'revenue',
        'sum(transactions)' : 'transactions'
      },
      where : {
        store : query.storeId,
        'date(time)' : {
          gte : moment(query.startDate)
            .format('YYYY-MM-DD'),
          lte : moment(query.endDate)
            .format('YYYY-MM-DD'),
        }
      }
    };
    return this.get(json)
    .then(function(data) {
      return {
        revenue: Number(data[0].revenue) || 0,
        transactions: Number(data[0].transactions) || 0
      };
    });
  };
  this.getPosChartData = function (query) {
    var json = {
      fields : {
        'sum(revenue)' : 'revenue',
        'sum(transactions)' : 'transactions',
        'time': 'step'
      },
      where : {
        store : query.storeId,
        'date(time)' : {
          gte : moment(query.startDate)
            .format('YYYY-MM-DD'),
          lte : moment(query.endDate)
            .format('YYYY-MM-DD'),
        }
      },
      groupBy: getGroupBy(query),
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


    if (data.length === 0) {
      return {
        revenue : {},
        transactions : {}
      };
    }
    // There might be holes in our input data (if values are 0)
    var labels = _.pluck(data, 'step');
    return {
      revenue : {
        labels : labels,
        series : [_.pluck(data, 'revenue')]
      },
      transactions : {
        labels : labels,
        series : [_.pluck(data, 'transactions')]
      }
    };
  }

  function getGroupBy (query) {
    var start = moment(query.startDate);
    var end = moment(query.endDate);
    if (start.isSame(end, 'day')) {
      return ['hour(time)'];
    } else if (start.isSame(end, 'month')) {
      return ['date(time)'];
    }
    return ['month(time)'];
  }


};
