'use strict';
import middleware from '../../middleware';
import queueService from '../../services/queueService';

const get = {
  url : '/stores/:store/queues',
  handler (req, res, next) {
    return queueService.get(R.merge(req.params, req.query));
  },
  middleware : [middleware.read]
};

export default {
  get,
};
