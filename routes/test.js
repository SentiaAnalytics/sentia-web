'use strict';

exports.echo = {
  handler : function (req, res) {
    var body = {
      params : req.params,
      query : req.query,
      body : req.body
    };
    console.log(body);
    return res.send(body);
  },
  middleware : [testmiddleware]
};

function testmiddleware(req, res, next) {
  if (req.query.where) {
    console.log(typeof req.query.where);
    try {
      req.query.where = JSON.parse(req.query.where);
    }
    catch (e) {
      return next(new Error('could not parse where'));
    }
  }
  return next();

}
