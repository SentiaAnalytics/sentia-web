'use strict';
import http from '../../services/http';
import util from '../../util';

export default {
  filterInput,
  fetchData,
  buildJsonQuery,
  parseNumbersAndDates
};

function filterInput (query) {
  return (query.startDate && query.endDate && query.store);
}

function fetchData (data) {
  return R.pipe(
    buildJsonQuery,
    logger.log('pos query'),
    query => `/api/pos?json=${JSON.stringify(query)}`,
    http.get
  )(data);
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
          .format('YYYY-MM-DD'),
        lte : moment(query.endDate)
          .format('YYYY-MM-DD'),
      }
    },
    "groupBy": ['date(time), hour(time)'],
    "orderBy" : {
      time : true
    }
  };
}

function parseNumbersAndDates (data) {
  return {
    revenue: parseFloat(data.revenue) || 0,
    transactions: parseFloat(data.transactions) || 0,
    time: moment(data.time)
  };
}
