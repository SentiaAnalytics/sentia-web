'use strict';
import http from '../../services/http';
import util from '../../util';



const filterInput = (query) => {
  return (
    query.startDate &&
    query.endDate &&
    query.cameralist &&
    !R.isEmpty(query.cameralist)
  );
};

const getEntranceCameras = (query) => {
  var isEntrance = R.compose(R.equals('entrance'), R.prop('counter'));
  return R.over(R.lensProp('cameralist'), R.filter(isEntrance), query);
};


const buildJsonQuery = (query) => {
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

const fetchData = (query) => {
  const fillResultGaps = util.fillDataGaps(query.startDate, query.endDate, {people: 0});
  const jsonQuery = R.compose(encodeURIComponent, JSON.stringify, buildJsonQuery);
  return http.get('/api/people?json=' + jsonQuery(query))
    .map(processResult)
    .map(fillResultGaps);
};


const processResult = (data) => {
  return R.map(e => {
    return {
      people: parseInt(e.people, 10) || 0,
      time: moment(e.time)
    };
  }, data);
};

export default {
  filterInput,
  getEntranceCameras,
  fetchData,
  buildJsonQuery,
  processResult
};
