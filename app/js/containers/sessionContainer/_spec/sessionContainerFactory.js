'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import sessionContainerFactory from '../sessionContainerFactory';

let shouldHttpFail = false;
let exampleSession = {
  user: {
    email: 'andreas@example.com',
    firstname: 'Andreas',
    lastname: 'Moeller'
  }
};

const httpMock = {
  get: () => {
    if (shouldHttpFail) return Rx.Observable.throw({data: 'http error'});
    return new Rx.BehaviorSubject({
      user: {
        firstname: 'Andreas',
        lastname: 'Moeller'
      }
    });
  },
  post: credentials => {
    if (data.email === 'andreas@example.com' &&  data.password === 'password') {
      return new Rx.BehaviorSubject(exampleSession);
    }
    return Rx.Observable.throw({data: 'BAD LOGIN'});
  },
  del: () => new Rx.BehaviorSubject('OK'),
}
let disposable;

describe('sessionContainer', function () {
});
