'use strict';
export function getGroupBy (query) {
  if (query.startDate.isSame(query.endDate, 'day')) {
    return ['hour(time)'];
  } else if (query.startDate.isSame(query.endDate, 'month')) {
    return ['date(time)'];
  }
  return ['month(time)'];
}

export function generateJsonQuery (query) {
  return {
    fields : {
      'sum(revenue)' : 'revenue',
      'sum(transactions)' : 'transactions',
      'time': 'step'
    },
    where : {
      store : query.store.id,
      'date(time)' : {
        gte : query.startDate
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
        lt : query.endDate
          .tz('UTC')
          .format('YYYY-MM-DD HH:mm:ss'),
      }
    },
    groupBy: getGroupBy(query),
    orderBy : {
      step : true
    }
  };
}
