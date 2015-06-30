'use strict';
import {expect} from 'chai';
import moment from 'moment-timezone';
import sinon from 'sinon';
import * as helper from '../helper';

describe('poStore - helper', function () {
  describe('getGroupBy', function () {
    it('should group by hour if given dates on the same day', function () {
      let query = {
        startDate: moment('2015-01-01'),
        endDate: moment('2015-01-01'),
      };
      let result = helper.getGroupBy(query);
      expect(result).to.eql(['hour(time)']);
    });

    it('should group by day if given dates in the same month', function () {
      let query = {
        startDate: moment('2015-01-01'),
        endDate: moment('2015-01-30'),
      };
      let result = helper.getGroupBy(query);
      expect(result).to.eql(['date(time)']);
    });

    it('should group by month if given dates in different months', function () {
      let query = {
        startDate: moment('2015-01-01'),
        endDate: moment('2015-02-01')
      };
      let result = helper.getGroupBy(query);
      expect(result).to.eql(['month(time)']);
    });
  });

  describe('generateJsonQuery', function () {
    it('should return a json query from the supplied params', function () {
      const query = {
        store: {
          id :1
        },
        startDate: moment('2015-01-01'),
        endDate: moment('2015-01-01')
      };
      const expected = {
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
        groupBy: helper.getGroupBy(query),
        orderBy : {
          step : true
        }
      };

      var jsonQuery = helper.generateJsonQuery(query);

      expect(jsonQuery).to.eql(expected);
    });
  });

});
