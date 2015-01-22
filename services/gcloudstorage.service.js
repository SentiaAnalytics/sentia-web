'use strict';
var config = require('config');
var logger = require('bragi');
var Stream = require('stream').Readable;
var HTTPError = require('node-http-error');
console.log(config);
var gcloud = require('gcloud')({
  credentials: config.gcloud.credentials
});
exports.getReadStream = function (bucketName, filepath) {
  var bucket;
  if (!bucketName) {
    logger.log('debug:gcloud:error', 'no company');
    throw new HTTPError(500, 'Missing company');
  }
  if (!filepath) {
    logger.log('debug:gcloud:error', 'no File Path');
    throw new HTTPError(400, 'Missing Filepath');
  }
  bucket = gcloud.storage().bucket(bucketName);
  var readstream = bucket.file(filepath)
    .createReadStream();
  logger.log('debug:gcloud', 'before return');
  return readstream;
};
