'use strict';
const getDiff = R.curry((startDate, endDate, step) => endDate.diff(startDate, step) + 1);
const dateKeys = {
  'hours' : date => date.format('YYYY-MM-DD HH:00:00'),
  'days' : date => date.format('YYYY-MM-DD'),
  'months' : date => date.format('YYYY-MM'),
  'years' : date => date.format('YYYY'),
}

const getDateStep = R.curry((startDate, endDate) => {
  const duration = getDiff(startDate, endDate, 'days');
  if (duration < 3) {
    return 'hours'
  }
  if (duration < 60) {
    return 'days'
  }

  if (duration <= (364 * 2)) {
    return 'months'
  }
  return 'years';
});

export default R.curry((startDate, endDate, defaultValue, data) => {
  const step = R.partial(getDateStep, startDate, endDate);
  const duration = R.compose(getDiff(startDate, endDate), step);
  const range = R.compose(R.range(0), duration);
  const dateKey = dateKeys[step()];

  const defaultList = R.compose(R.map(i => R.assoc('time',moment(startDate).add(i, step()), defaultValue)), range);

  const buildDataMap = R.compose(R.mapObj(R.head), R.groupBy(R.compose(dateKey, R.prop('time'))));
  const dataMap = buildDataMap(data);

  return R.compose(R.map(x => dataMap[dateKey(x.time)] || x), defaultList)();
});
