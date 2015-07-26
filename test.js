'use strict';
import rx from 'rx';
import R from 'ramda';
import immutable from 'immutable';


const union = R.unionWith((a, b)=> a.id === b.id, list1, list2);

console.log(union);
