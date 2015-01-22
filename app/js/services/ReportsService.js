var moment = require('moment');
module.exports = function(Pos) {
  'use strict';
  this.getTotalRevenue = function (storeid, date) {
    var query = {
      fields : {
        'sum(amount)' : 'total',
      },
      where : {
        store : storeid,
        type : 'Item',
        'starttime' : {
          gte : moment(date)
            .format('YYYY-MM-DD'),
          lt : moment(date)
            .add(1, 'month')
            .format('YYYY-MM-DD')
        }
      }
    };
    return Pos.get(query)
      .then(function(data) {
        console.log(data);
        if(data.length === 0) {
          return;
        }
        return Math.round(Number(data[0].total)*100)/100;
      });
  };

  this.getTotalTransactions = function (storeid, date) {
    var query = {
      fields : {
        'count(distinct(salesno))' : 'total',
      },
      where : {
        store : storeid,
        type : 'Item',
        'starttime' : {
          gte : moment(date)
            .format('YYYY-MM-DD'),
          lt : moment(date)
            .add(1, 'month')
            .format('YYYY-MM-DD')
        }
      }
    };
    return Pos.get(query)
      .then(function(data) {
        if(data.length === 0) {
          return;
        }
        return Math.round(Number(data[0].total)*100)/100;
      });
  };
};
