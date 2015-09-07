'use strict';
import '../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import catchErrors from '../catchErrors';

describe('util/catchErrors', function () {
  let returnsError = sinon.spy(() => Rx.Observable.throw('ERROR'));
  beforeEach(returnsError.reset)

  it('should return an empty observable on error', function () {
      let subject = new Rx.Subject();
      let errorSubject = new Rx.Subject();
      let spy = sinon.spy();
      subject
        .flatMap(catchErrors(errorSubject, returnsError))
        .subscribe(spy);

      subject.onNext(1);

      expect(spy.called).to.equal(false);
      expect(returnsError.calledOnce).to.equal(true);
  });

  it('should pass the erorr to the error subject', function () {
      let subject = new Rx.Subject();
      let errorSubject = new Rx.Subject();
      let spy = sinon.spy();
      let errorspy = sinon.spy();

      errorSubject.subscribe(errorspy);

      subject
        .flatMap(catchErrors(errorSubject, returnsError))
        .subscribe(spy);

      subject.onNext(1);

      expect(spy.called).to.equal(false);
      expect(errorspy.calledOnce).to.equal(true);
      expect(errorspy.args[0][0]).to.equal('ERROR');
  });
});
