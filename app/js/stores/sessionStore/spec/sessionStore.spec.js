'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import sessionStore from '../';

describe('sessionStore', function () {
  before(function () {
    sinon.stub(http, 'get', function (url) {
      console.log('GET');
      return new rx.BehaviorSubject({
        user: {
          firstname: 'Andreas',
          lastname: 'Moeller'
        }
      });
    });
  });

  after(function () {
    http.get.restore();
  });

  describe('fetch', function () {

    beforeEach(function () {
      sessionStore.store.onNext(null);
    });

    it('should fetch the current session when recieving a fetch action', function (done) {
      let spy = sinon.spy(onChange);
      sessionStore.store.subscribe(spy);

      sessionStore.update.onNext({action: 'fetch'});

      function onChange (session) {
        if(!session) return;

        expect(spy.calledTwice).to.be.true;
        expect(session).to.eql({
          user: {
            firstname: 'Andreas',
            lastname: 'Moeller'
          }
        });
        done();
      }
    });
  });


});
