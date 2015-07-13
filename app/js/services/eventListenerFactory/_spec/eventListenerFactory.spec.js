'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import eventListenerFactory from '../index';

describe('eventListenerFactory', function () {
  describe('create', function () {
    it('should return a subject that doubles as a setter', function () {
      let subject = eventListenerFactory.create();
      let spy = sinon.spy();
      subject.subscribe(spy);
      subject(1);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.args[0][0]).to.equal(1);
    });
  });
});
