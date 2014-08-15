'use strict';
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
  if (!err.code) {
    return res.status(500)
      .send('Internal Server Error');
  }
  return res.status(err.code)
    .send(err.message);
};
