'use strict';
var chai = require('chai');
var HTTPError = require('node-http-error');
var 
var expect = chai.expect;
var config = require('config');
var sinon = require('sinon');
var imagesService = require('../../services/gcloudstorage.service');
chai.use(require('chai-as-promised'));

describe('images.service', function() {
  describe('get', function() {
    it('should return an error when called with out a company', function () {
      var res = imagesService.get(null, 'path/to/file');
      res.should.be.rejectedWith(new HTTPError(500, 'Internal Server Error'));
    });
    it('should return an error when called without a filepath', function () {
      var res = imagesService.get('bucket', null);
      res.should.be.rejectedWith(new HTTPError(400, 'Missing filepath'));
    });
  });
});
