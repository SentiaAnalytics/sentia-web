'use strict';
module.exports = function (err, req, res, next) {
  console.log('err');
  console.log(err);
  if (!err) {
    return next();
  }
    // console.error(err.stack);
  if (err.code) {
    return res.status(err.code)
      .send(err.message);
  }
  return res.status(500)
      .send('Internal Server Error');
};
