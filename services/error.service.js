'use strict';
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
  logger.error(err.stack || err);
    // console.error(err.stack);
  if (err.status) {
    return res.status(err.status)
      .send(err.message);
  }
  return res.status(500)
      .send('Internal Server Error');
};
