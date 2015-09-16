'use strict';
import R from 'ramda';
const median = R.compose(list => (list[Math.ceil((list.length-1)/2)] + list[Math.floor((list.length-1)/2)])/2,R.sort((a, b) => a - b));

console.log(median([1,2,3, 4, 5, 6, 7, 8, 9]));
console.log(median([1,2,3,4,5, 6, 7, 8, 9, 10]));
