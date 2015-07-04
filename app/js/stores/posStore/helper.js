'use strict';
import storeStore from '../storeStore';
import dateStore from '../dateStore';
import http from '../../services/http';

export default {
  buildQuery,
  filterInput,
  fetchData,
  buildJsonQuery,
  getGroupBy
};

function buildQuery () {
  return R.merge(
    dateStore.store.getValue(),
    {storeid: R.prop('id', storeStore.store.getValue())}
  );
}

function filterInput (query) {
  return query.startDate && query.endDate && query.storeId;
}

function fetchData (query) {
  let jsonQuery = buildQuery(query);
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
