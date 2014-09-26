'use strict';
module.exports = function (err, req, res, next) {
  if (!err) {
    return next();
  }
  console.log(err);
    // console.error(err.stack);
  if (err.statusCode) {
    return res.status(err.statusCode)
      .send(err.message);
  }
  return res.status(500)
      .send('Internal Server Error');
};
