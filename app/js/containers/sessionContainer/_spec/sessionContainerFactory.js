'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import http from '../../../services/http';
import sessionContainerFactory from '../sessionContainerFactory';

const exampleSession = {
  user: {
    email: 'andreas@example.com',
    firstname: 'Andreas',
    lastname: 'Moeller'
  }
};

const http = {
  get: () => Bacon.once(exampleSession),
  post: credentials => {
    if (data.email === 'andreas@example.com' &&  data.password === 'password') {
      return Bacon.once(exampleSession);
    }
    return Bacon.once(new Bacon.Error({data: 'BAD LOGIN'}));
  },
  del: () => Bacon.once('OK'),
}
let disposable;

describe('sessionContainer', function () {
  
});
