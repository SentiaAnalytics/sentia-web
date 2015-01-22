'use strict';
var logger = require('bragi');
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
  logger.log('errorhandler:error', err.stack || err);
    // console.error(err.stack);
  if (err.code) {
    return res.status(err.code)
      .send(err.message);
  }
  return res.status(500)
      .send('Internal Server Error');
};
