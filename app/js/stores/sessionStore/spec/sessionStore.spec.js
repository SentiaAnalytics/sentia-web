'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import sessionStore from '../';

describe('sessionStore', function () {
  before(function () {
    sinon.stub(http, 'get', function (url) {
      return new rx.BehaviorSubject({
        user: {
          firstname: 'Andreas',
          lastname: 'Moeller'
        }
      });
    });
    sinon.stub(http, 'post', function (url, data) {
      if (data.email === 'andreas@example.com' &&  data.password === 'password') {
        return new rx.BehaviorSubject({
          user: {
            email : data.email,
            firstname: 'Andreas',
            lastname: 'Moeller'
          }
        });
      }
      return new rx.BehaviorSubject(null);
    });
  });

  after(function () {
    http.get.restore();
    http.post.restore();
  });

  describe('fetch', function () {
    let observer;
    beforeEach(function () {
      sessionStore.store.onNext(null);
    });

    afterEach(function () {
       observer && observer.dispose();
    });

    it('should fetch the current session when recieving a fetch action', function (done) {
      let spy = sinon.spy(onChange);
      observer = sessionStore.store.subscribe(spy);

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

  describe('login', function () {
    let observer;

    beforeEach(function () {
      sessionStore.store.onNext(null);
    });

    after(function () {
      observer && observer.dispose();
    });

    it('should fetch the current session when recieving a fetch action', function (done) {
      let spy = sinon.spy(onChange);
      observer = sessionStore.store.subscribe(spy);

      sessionStore.update.onNext({
        action: 'login',
        payload: {
          email : 'andreas@example.com',
          password: 'password'
        }
      });

      function onChange (session) {
        if(!session) {
          return;
        }
        expect(spy.calledTwice).to.equal(true);
        expect(session).to.eql({
          user: {
            email: 'andreas@example.com',
            firstname: 'Andreas',
            lastname: 'Moeller'
          }
        });
        done();
      }
    });
  });


});
