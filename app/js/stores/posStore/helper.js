'use strict';
import storeStore from '../storeStore';
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
    "groupBy": getGroupBy(query),
    "orderBy" : {
      time : true
    }
  };
}

function getGroupBy (query) {
  var diff = moment.duration(query.endDate.diff(query.startDate));
  if (diff.asDays() <= 1) {
    return ['hour(time)'];
  } else if (diff.asDays() <= 32) {
    return ['date(time)'];
  } else {
    return ['month(time)'];
  }
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
