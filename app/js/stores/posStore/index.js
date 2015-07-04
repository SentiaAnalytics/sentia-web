'use strict';
import storeStore from '../storeStore';
import dateStore from '../dateStore';
import helper from './helper';

let store = new rx.BehaviorSubject();
let error = new rx.Subject();

export default {
  store,
  error
};

rx.Observable.merge(dateStore.store, storeStore.store)
  .map(helper.buildQuery)
  .filter(helper.filterInput)
  .flatMap(helper.getPosData)
