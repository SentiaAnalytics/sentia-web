'use strict';
var config = require('config');
var P = require('bluebird');
var HTTPError = require('node-http-error');
var gcloud = require('gcloud')({
  credentials: {
    private_key: config.gcloud.private_key
  }
});
exports.get = function (bucketName, filepath) {
  var bucket;
  if (!bucketName) {
    return P.reject(new HTTPError(500, 'Internal Server Error'));
  }

  if (!filepath) {
    return P.reject(new HTTPError(400, 'Missing Filepath'));
  }
  bucket = gcloud.storage.bucket(bucketName);
  return bucket.file(filepath)
    .createReadStream();
};
