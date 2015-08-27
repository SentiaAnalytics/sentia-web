'use strict';
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
    // console.error(err.stack);
  if (err.status) {
    logger.error(err);
    return res.status(err.status)
      .send(err.message);
  }
  logger.error(err.stack || err);
  return res.status(500)
      .send('Internal Server Error');
};
