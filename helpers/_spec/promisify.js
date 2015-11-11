import assert from 'assert';
import {promisify, promisifyMethod} from '../promisify';

describe('promisify', () => {
  describe('promisify', () => {
    it('should convert return a promsified function', () => {
      const expected = 'success';
      const input = (n, callback) => {
        setTimeout(() => {
          callback(null, 'success');
        }, n);
      };
      const promisified = promisify(input);

      return promisified(0)
        .then(actual => {
          assert.equal(actual, expected);
        });
    });
  });

  describe('promisifyMethod', () => {
    it('should work with object methods', () => {
      const expected = 'success';
      const input = {
        value: 'success',
        func (n, callback) {
          setTimeout(() => {
            callback(null, this.value);
          }, n);
        }
      };
      const promisified = promisifyMethod(input, 'func');

      return promisified(0)
        .then(actual => {
          assert.equal(actual, expected);
        });
    });
  });
});
