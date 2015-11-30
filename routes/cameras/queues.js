const middleware = require('../../middleware');
const queueService = require('../../services/queue-service');

const get = {
  url: '/cameras/:camera/queue',
  handler (req) {
    return queueService.get(R.merge(req.params, req.query));
  },
  middleware: [middleware.read]
};

const getPrediction = {
  url: '/queueprediction',
  handler (req) {
    return queueService.getPrediction(R.merge(req.params, req.query));
  },
  middleware: [middleware.read]
}

module.exports = {
  get: get,
  getPrediction: getPrediction
};
