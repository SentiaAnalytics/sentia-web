'use strict';
import http from '../../services/http';

export default {
  fetchData,
  buildJsonQuery
};

function fetchData (jsonQuery) {
  return http.get(`/api/people?json=${jsonQuery}`);
}

function buildJsonQuery (query) {
  return {
    fields : {
      'sum(people_in)' : 'people',
      'cam' : 'cam'
    },
    where : {
      cam: query.cameras,
      'time' : {
        gte : query.startDate
          .clone()
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
        lt : query.endDate
          .clone()
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      'hour(time)' : {
        gte : 9,
        lte : 20
      }
    },
    groupBy : ['cam']
  };
}
