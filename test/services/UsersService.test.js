'use strict';
var chai = require('chai'),
  should = chai.should(),
  UsersService = require('../../services/UsersService'),
  models = require('../../models'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('UsersService:', function () {
  describe('_buildFindQuery', function () {
    it('shoulf return a query with the correct email', function () {
        var query = UsersService._buildFindQuery({CompanyId : 1});
        query.should.eql({where : {
          CompanyId :1
        }});
      });  
  });
});
