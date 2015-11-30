const db = require('../../helpers/mysql');
const R = require('ramda');
const D = require('date-fp');

const SELECT_QUEUE = `
    SELECT * FROM queues
  WHERE cam=?
  AND time BETWEEN ? AND ?
  ORDER BY time
  LIMIT 1
  `;

const promise = (value) => Promise.resolve(value)

const prepQueryParams = (params) => {
  if (params.time) {
    return R.evolve({time: D.parse}, params);
  }
  return R.assoc('time', new Date(), params);
};
const valueList = (params) => [params.camera, D.sub('hours', 1, params.time), params.time];
const buildQueryValues = R.compose(promise, valueList, prepQueryParams);

module.exports = R.composeP(R.head, db.safeQuery(SELECT_QUEUE), buildQueryValues);
