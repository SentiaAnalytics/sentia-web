import models from '../../models';
import HTTPError from 'node-http-error';

const create = query => {
  const user = new models.User(query);

  return user.savep()
    .catch(err => {
      logger.log('debug', 'users', err);
      if (err.err && err.err.indexOf('duplicate key') !== 1) {
        return Promise.reject(new HTTPError(400, 'A user with that email already exists'));
      }
      return Promise.reject(new HTTPError(500, 'Database Error'));
    });
};

const find = query => {
  return models.User.find(query).exec();
};

const del = query => {
  return models.User.findOneAndRemove(query)
    .exec();
};

export default {create, find, delete: del};
