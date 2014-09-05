// 'use strict';
// var chai = require('chai'),
//   helper = require('../helper'),
//   sinon = require('sinon');
//
// chai.use(require('chai-as-promised'));
//
// describe('Maps - find', function () {
//   it('should return a valid map if called correctly', function () {
//     var q = {
//       cam : 1,
//       from : 123456789,
//       to : 987654321
//     };
//     return helper.maps.list(q)
//       .then(function (res) {
//         res.should.have.property('body');
//         res.body.should.contain(helper.dummyMap);
//         res.should.have.property('statusCode', 200);
//       });
//   });
//   it('should return a 404 if the map does not exist', function () {
//     var q = {
//       cam : 2,
//       from : 123456789,
//       to : 987654321
//     }
//     return helper.maps.list(1)
//       .then(function (res) {
//         res.should.have.property('statusCode', 404);
//         res.should.have.property('body', 'Could not find map');
//       });
//   });
// });
