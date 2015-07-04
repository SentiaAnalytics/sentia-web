'use strict';
import {expect} from 'chai';
import moment from 'moment-timezone';
import sinon from 'sinon';
import helper from '../helper';

describe('postStore - helper', function () {
  describe('buildJsonQuery', function () {
    let query = {
      startDate: moment(123),
      endDate: moment(456),
      storeId: 1
    };
    let json = helper.buildJsonQuery(query);
    expect(json).to.eql(require('./data/jsonQuery.json'))
  });

});
