'use strict';
import catchErrors from './catchErrors';
import getEnumerablePropertyNames from './getEnumerablePropertyNames';
import getFormData from './getFormData';
import memoize from './memoize';
import switcher from './switcher';
import round from './round';
import querySelector from './querySelector';
import querySelectorAll from './querySelectorAll';
import queryDateFormat from './queryDateFormat';
import formatNumber from './formatNumber';

const headLens = R.lensIndex(0);
const endLens = R.lensIndex(-1);

export default {
  catchErrors,
  endLens,
  formatNumber,
  getEnumerablePropertyNames,
  getFormData,
  headLens,
  memoize,
  round,
  switcher,
  queryDateFormat,
  querySelector,
  querySelectorAll
};
