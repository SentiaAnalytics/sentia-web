'use strict';
var chai = require('chai'),
  helper = require('../../helper'),
  sinon = require('sinon');


chai.use(require('chai-as-promised'));

describe('/stores/:storeId/cameras/find', function () {
  before(function () {
    return helper.users.login({email : 'user@example.com', password : 'password'});
  });
  var status, data;
  before(function () {
    var params = {
      storeId : 1,
      limit : 1,
      order : 'name'
    };
    return helper.stores.cameras.find(params)
      .then(function (r) {
        status = r.statusCode;
        data = r.body;
      });
  });

  it('should return 200', function () {
    status.should.equal(200);
  });

  it('should return a camera', function () {
    data.should.eql([helper.camera]);
  });
});
