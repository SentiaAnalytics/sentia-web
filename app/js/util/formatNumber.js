'use strict';
const interLace = R.compose(R.flatten, R.intersperse(','), R.splitEvery(3));
const addCommas = R.compose(R.join(''), R.reverse, interLace, R.reverse);
export default R.compose(R.join('.'), R.over(R.lensIndex(0), addCommas), R.split('.'), String);
