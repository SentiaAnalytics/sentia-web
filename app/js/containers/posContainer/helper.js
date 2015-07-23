'use strict';
import http from '../../services/http';
import util from '../../util';

export default {
  filterInput,
  fetchData,
  buildJsonQuery,
  processResult
};

function filterInput (query) {
  return (query.startDate && query.endDate && query.store);
}

function fetchData (query) {
  let jsonQuery = buildJsonQuery(query);
  return http.get('/api/pos?json=' + JSON.stringify(jsonQuery));
}

function buildJsonQuery (query) {
  return {
    "fields" : {
      "sum(revenue)" : "revenue",
      "sum(transactions)" : "transactions",
      "time": "time"
    },
    "where" : {
      "store" : query.store._id,
      'date(time)' : {
        gte : moment(query.startDate)
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
        lte : moment(query.endDate)
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
      }
    },
    "groupBy": ['date(time), hour(time)'],
    "orderBy" : {
      time : true
    }
  };
}

function processResult (data) {
  return R.map(e => {
    return {
      revenue: parseFloat(e.revenue) || 0,
      transactions: parseFloat(e.transactions) || 0,
      time: moment(e.time)
    };
  }, data);
}
