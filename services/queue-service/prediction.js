const D = require('date-fp');
const R = require('ramda');
const db = require('../../helpers/mysql');

const log = (key) => (value) => {
  console.log(key, value);
  return value;
};

const CURRENT_CONVERSION_QUERY =`
  SELECT sum(people_in)
  FROM people
  WHERE cam='543197b8ab3de09c344bc1e7'
  AND time BETWEEN ? AND ?
  UNION
  SELECT count(distinct(receiptcode)) as transactions
  FROM pos_data
  WHERE store='DK130'
  AND starttime BETWEEN ? AND ?;
`;

const parseParams = (params) => {
  if (params.time) {
    return R.evolve({time: D.parse}, params);
  }
  return R.assoc('time', new Date(), params);
};

const prepareValues = (params) => [
  D.sub('minutes', 5, params.time),
  params.time,
  D.sub('minutes', 5, params.time),
  params.time,
];
const buildQueryValues = R.compose((x) => Promise.resolve(x), prepareValues, parseParams);

const getConversion = R.composeP(
  (data) => data[0] / data[1],
  R.head,
  log('results'),
  db.safeQuery(CURRENT_CONVERSION_QUERY),
  log('stuff'),
  buildQueryValues
);

module.exports = getConversion;
