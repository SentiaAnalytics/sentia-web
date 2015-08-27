'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import sessionContainer from '../';

let shouldHttpFail = false;
let exampleSession = {
  user: {
    email: 'andreas@example.com',
    firstname: 'Andreas',
    lastname: 'Moeller'
  }
};

describe('sessionContainer', function () {
  before(stubHttp);

  after(restoreHttp);

  describe('fetch', function () {
    beforeEach(function () {
      sessionContainer.observable.onNext(null);
    });

    it('should fetch the current session when recieving a fetch action', function () {
      shouldHttpFail = false;

      sessionContainer.observer({action: 'fetch'});

      expect(sessionContainer.observable.getValue()).to.eql({
        user: {
          firstname: 'Andreas',
          lastname: 'Moeller'
        }
      });
    });
    it('it should catch errors and send them to the error observable', function () {
      shouldHttpFail = true;
      sessionContainer.observer({action: 'fetch'});

      let data = sessionContainer.observable.getValue();
      let error = sessionContainer.error.getValue();

      expect(data).to.equal(null);
      expect(error).to.equal('http error');
    });
  });

  describe('login', function () {

    beforeEach(function () {
      sessionContainer.observable.onNext(null);
    });


    it('should login when recieving valid credentials', function () {

      sessionContainer.observer({
        action: 'login',
        payload: {
          email : 'andreas@example.com',
          password: 'password'
        }
      });
      let session = sessionContainer.observable.getValue();
      expect(session).to.eql({
        user: {
          email: 'andreas@example.com',
          firstname: 'Andreas',
          lastname: 'Moeller'
        }
      });
    });

    it('should throw when recieving bad credentials', function () {
      sessionContainer.observer({
        action: 'login',
        payload: {
          email : 'andreas@example.com',
          password: 'badPassword'
        }
      });
      let store = sessionContainer.observable.getValue();
      let error = sessionContainer.error.getValue();

      expect(store).to.equal(null);
      expect(error).to.equal('BAD LOGIN');

    });
  });
  describe('logout', function () {
    it('should destroy the current session', function () {
      sessionContainer.observable.onNext(exampleSession);
      sessionContainer.observer({action: 'logout'});

      expect(sessionContainer.observable.getValue()).to.eql({});
    });
  });
});

function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    if (shouldHttpFail) return Rx.Observable.throw({data: 'http error'});
    return new Rx.BehaviorSubject({
      user: {
        firstname: 'Andreas',
        lastname: 'Moeller'
      }
    });
  });
  sinon.stub(http, 'post', function (url, data) {
    if (data.email === 'andreas@example.com' &&  data.password === 'password') {
      return new Rx.BehaviorSubject(exampleSession);
    }
    return Rx.Observable.throw({data: 'BAD LOGIN'});
  });

  sinon.stub(http, 'del', function (url) {
    return new Rx.BehaviorSubject('OK');
  });
}

function restoreHttp () {
  http.get.restore();
  http.post.restore();
  http.del.restore();
}
