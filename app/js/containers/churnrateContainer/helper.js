'use strict';



const _jsonQuery = (query) => {
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
const buildUrl = R.compose(query => `/api/people?json=${query}`, encodeURIComponent, JSON.stringify, _jsonQuery)

const mapCamerasToResults = R.curry((cameras, results) => {
  let resultmap = R.compose(R.fromPairs, R.map(R.props(['cam', 'people'])))(results);
  return R.map(x => {
    return R.assoc('people', parseInt(resultmap[x._id], 10) || 0, x);
  }, cameras);
});

export default {
  buildUrl,
  mapCamerasToResults,
};
