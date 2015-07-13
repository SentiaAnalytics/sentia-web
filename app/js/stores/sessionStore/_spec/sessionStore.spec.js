'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import sessionStore from '../';

let shouldHttpFail = false;
let exampleSession = {
  user: {
    email: 'andreas@example.com',
    firstname: 'Andreas',
    lastname: 'Moeller'
  }
};

describe('sessionStore', function () {
  before(stubHttp);

  after(restoreHttp);

  describe('fetch', function () {
    beforeEach(function () {
      sessionStore.onNext(null);
    });

    it('should fetch the current session when recieving a fetch action', function () {
      shouldHttpFail = false;

      sessionStore.set({action: 'fetch'});

      expect(sessionStore.getValue()).to.eql({
        user: {
          firstname: 'Andreas',
          lastname: 'Moeller'
        }
      });
    });
    it('it should catch errors and send them to the error observable', function () {
      shouldHttpFail = true;
      sessionStore.set({action: 'fetch'});

      let data = sessionStore.getValue();
      let error = sessionStore.error.getValue();

      expect(data).to.equal(null);
      expect(error).to.equal('http error');
    });
  });

  describe('login', function () {

    beforeEach(function () {
      sessionStore.onNext(null);
    });


    it('should login when recieving valid credentials', function () {

      sessionStore.set({
        action: 'login',
        payload: {
          email : 'andreas@example.com',
          password: 'password'
        }
      });
      let session = sessionStore.getValue();
      expect(session).to.eql({
        user: {
          email: 'andreas@example.com',
          firstname: 'Andreas',
          lastname: 'Moeller'
        }
      });
    });

    it('should throw when recieving bad credentials', function () {
      sessionStore.set({
        action: 'login',
        payload: {
          email : 'andreas@example.com',
          password: 'badPassword'
        }
      });
      let store = sessionStore.getValue();
      let error = sessionStore.error.getValue();

      expect(store).to.equal(null);
      expect(error).to.equal('BAD LOGIN');

    });
  });
  describe('logout', function () {
    it('should destroy the current session', function () {
      sessionStore.onNext(exampleSession);
      sessionStore.set({action: 'logout'});

      expect(sessionStore.getValue()).to.eql({});
    });
  });
});

function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    if (shouldHttpFail) return rx.Observable.throw('http error');
    return new rx.BehaviorSubject({
      user: {
        firstname: 'Andreas',
        lastname: 'Moeller'
      }
    });
  });
  sinon.stub(http, 'post', function (url, data) {
    if (data.email === 'andreas@example.com' &&  data.password === 'password') {
      return new rx.BehaviorSubject(exampleSession);
    }
    return rx.Observable.throw('BAD LOGIN');
  });

  sinon.stub(http, 'del', function (url) {
    return new rx.BehaviorSubject('OK');
  });
}

function restoreHttp () {
  http.get.restore();
  http.post.restore();
  http.del.restore();
}
