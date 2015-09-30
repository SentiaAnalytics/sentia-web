'use strict';
import util from '../../util';

const getEntranceCameras = (query) => {
  var isEntrance = R.compose(R.equals('entrance'), R.prop('counter'));
  return R.over(R.lensProp('cameralist'), R.filter(isEntrance), query);
};


const _JsonQuery = (query) => {
  return {
      fields : {
        [util.queryDateFormat(query.startDate, query.endDate)] : 'time',
        'sum(people_in)' : 'people'
      },
      where : {
        cam : R.map(R.prop('_id'),query.cameralist),
        'date(time)' : {
          gte : query.startDate
            .format('YYYY-MM-DD'),
          lte : query.endDate
            .format('YYYY-MM-DD')
        },
        'hour(time)' : {
          gte : 7,
          lte : 20
        }
      },
      groupBy : util.queryDateFormat(query.startDate, query.endDate),
      orderBy : {
        'time': true
      }
    };
};
const buildUrl = R.compose(query => `/api/people?json=${query}`, encodeURIComponent, JSON.stringify, _JsonQuery);
const processResult = R.map(R.evolve({
  time: R.compose(t => t.add(2, 'hours'), moment),
  people: n => parseInt(n, 10) || 0
}));

export default {
  processResult,
  getEntranceCameras,
  buildUrl,
};
