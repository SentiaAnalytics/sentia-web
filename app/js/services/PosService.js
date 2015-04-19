module.exports = function($http) {
  'use strict';
  var _ = require('lodash');
  var moment = _.partialRight(require('moment-timezone').tz, 'Europe/Copenhagen');

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
          gte : query.startDate
            .clone()
            .startOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : query.endDate
            .clone()
            .endOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
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
          gte : query.startDate
            .clone()
            .startOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : query.endDate
            .clone()
            .endOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
        }
      },
      groupBy: getGroupBy(query),
      orderBy : {
        step : true
      }
    };

    return this.get(json)
      .then(function (data) {
        return _.map(data, function (e) {
          return _.defaults({step: moment(e.step)}, e);
        });
      })
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
    var start = query.startDate;
    var end = query.endDate;
    if (start.isSame(end, 'day')) {
      return ['hour(time)'];
    } else if (start.isSame(end, 'month')) {
      return ['date(time)'];
    }
    return ['month(time)'];
  }


};
