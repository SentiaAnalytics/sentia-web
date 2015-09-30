'use strict';
import util from '../../util';

const filterInput = ({start}) => (query.startDate && query.endDate && query.store);

const _JsonQuery = query => {
  return {
    "fields" : {
      "sum(revenue)" : "revenue",
      "sum(transactions)" : "transactions",
      [util.queryDateFormat(query.startDate, query.endDate)]: "time"
    },
    "where" : {
      "store" : query.store._id,
      'date(time)' : {
        gte : moment(query.startDate)
          .format('YYYY-MM-DD'),
        lte : moment(query.endDate)
          .format('YYYY-MM-DD'),
      }
    },
    "groupBy": util.queryDateFormat(query.startDate, query.endDate),
    "orderBy" : {
      time : true
    }
  };
};

const buildUrl = R.compose(query => `/api/pos?json=${query}`, encodeURIComponent, JSON.stringify, _JsonQuery);
const parseNumbersAndDates = (data) => {
  return {
    revenue: parseFloat(data.revenue) || 0,
    transactions: parseFloat(data.transactions) || 0,
    time: moment(data.time)
  };
};

export default {
  filterInput,
  buildUrl,
  parseNumbersAndDates
};
