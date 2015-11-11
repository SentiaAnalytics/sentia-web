import assert from 'assert';
import crypto from '../crypto';

describe('crypto', () => {
  describe('hash', () => {
    it('should return a promise for the hash', () => {
      const input = 'password';
      const expected = "123";

      return crypto.hash(input)
        .then(actual => {
          assert.equal(actual, expected);
        });
    });
  });
});
