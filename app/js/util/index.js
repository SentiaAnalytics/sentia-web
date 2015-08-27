'use strict';
import catchErrors from './catchErrors';
import getEnumerablePropertyNames from './getEnumerablePropertyNames';
import getFormData from './getFormData';
import memoize from './memoize';
import switcher from './switcher';
import round from './round';
import querySelector from './querySelector';
import querySelectorAll from './querySelectorAll';

const headLens = R.lensIndex(0);
const endLens = R.lensIndex(-1);

export default {
  catchErrors,
  endLens,
  getEnumerablePropertyNames,
  getFormData,
  headLens,
  memoize,
  round,
  switcher,
  querySelector,
  querySelectorAll
};
