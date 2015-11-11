import R from 'ramda';
import bcrypt from 'bcrypt-nodejs';
import {promisifyMethod} from './promisify';

const _genSalt = promisifyMethod(bcrypt, 'genSalt');
const _hash = R.curryN(2, promisifyMethod(bcrypt, 'hash'));
const _compare = R.curryN(2, promisifyMethod(bcrypt, 'compare'));

const _validate = x => {
  if (!x) {
    throw new Error('Invalid Password');
  }
  return x;
};

const hash = password => _genSalt(10).then(_hash(password));

const compare = R.composeP(_validate, _compare);

export default {
  hash,
  compare
};
