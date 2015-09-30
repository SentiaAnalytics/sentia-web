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
import fillDataGaps from './fillDataGaps';
import bindDateToUrlProperty from './bindDateToUrlProperty';

const headLens = R.lensIndex(0);
const endLens = R.lensIndex(-1);

export default {
  bindDateToUrlProperty,
  catchErrors,
  endLens,
  fillDataGaps,
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
