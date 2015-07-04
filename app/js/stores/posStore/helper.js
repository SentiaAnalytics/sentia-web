'use strict';
import storeStore from '../storeStore';
import dateStore from '../dateStore';
import http from '../../services/http';
import util from '../../util';

export default {
  filterInput,
  fetchData,
  buildJsonQuery,
  getGroupBy,
  processResult
};

function filterInput (query) {
  return (query.startDate && query.endDate && query.store);
}

function fetchData (query) {
  let jsonQuery = buildJsonQuery(query);
  return http.get('/api/pos?json' + JSON.stringify(jsonQuery));
}

function buildJsonQuery (query) {
  return {
    "fields" : {
      "sum(revenue)" : "revenue",
      "sum(transactions)" : "transactions",
      "time": "step"
    },
    "where" : {
      "store" : query.storeId,
      'date(time)' : {
        gte : query.startDate
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
        lt : query.endDate
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
      }
    },
    "groupBy": getGroupBy(query),
    "orderBy" : {
      step : true
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

function processResult (result) {
  return {
    totalRevenue: sum('revenue', result),
    totalTransactions: sum('transactions', result)
  };

  function sum (prop, result) {
    return R.pipe(
      R.map(R.pipe(R.prop(prop), Number)),
      R.filter((x) => !isNaN(x)),
      R.sum,
      (x) => {
        console.log(x);
        return x;
      },
      util.round(2)
    )(result);
  }
}
