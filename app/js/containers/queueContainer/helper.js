'use strict';

const format = time => time.format('YYYY-MM-DD')
const buildUrl = R.compose(
  ({startDate, endDate, store}) => `/api/stores/${store}/queues?from=${startDate}&to=${endDate}`,
  R.evolve({
    startDate:format,
    endDate:format,
    store: R.prop('_id')
  })
);
export default { buildUrl };
