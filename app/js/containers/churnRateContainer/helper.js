'use strict';
import http from '../../services/http';

export default {
  fetchData,
  mapCamerasToResults: R.curry(mapCamerasToResults)
};

function fetchData (query) {
  return http.get(`/api/people?json=${JSON.stringify(buildJsonQuery(query))}`);
}

function buildJsonQuery (query) {
  return {
    fields : {
      'sum(people_in)' : 'people',
      'cam' : 'cam'
    },
    where : {
      cam: R.map(x=> x._id, query.cameras),
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

function mapCamerasToResults (cameras, results) {
  let makePair = (x) => {return [x.cam, x.people];};
  let resultmap = R.pipe(R.map(makePair), R.fromPairs)(results);

  return R.map(x => {
    return R.assoc('people', parseInt(resultmap[x._id], 10) || 0, x);
  }, cameras);
}
