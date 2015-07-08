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
  return http.get('/api/people?json=' + JSON.stringify(jsonQuery));
}

function buildJsonQuery (query) {
  return {
      fields : {
        'time' : 'date',
        'sum(people_in)' : 'people'
      },
      where : {
        cam : query.cameras,
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
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 8,
          lte : 20
        }
      },
      groupBy : getGroupBy(query),
      orderBy : {
        'time': true
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

function processResult (data) {
  return R.map(e => {
    return {
      revenue: parseFloat(e.revenue) || 0,
      transactions: parseFloat(e.transactions) || 0,
      time: moment(e.time)
    };
  }, data);
}
