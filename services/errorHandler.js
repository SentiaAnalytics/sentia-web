'use strict';
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
  if (!err.code) {
    console.error(err.stack);
    return res.status(500)
      .send({code : 500, message :'Internal Server Error'});
  }
  return res.status(err.code)
    .send(err);
};
