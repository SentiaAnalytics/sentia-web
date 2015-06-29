'use strict';
import storeFactory from '../services/storeFactory';
import {dateStoreToken} from '../dateStore';
import * as sessionAPI from '../services/sessionAPI';

let store = storeFactory();
let totalRevenue;

export function getTotalRevenue(){
  return totalRevenue;
}

export function onChange(listener){
  return store.onChange(listener);
}

export function removeListener(listener){
  return store.removeListener(listener);
}

export let dispatchToken = store.register(actionListener);

function actionListener(action){
  switch(action.actionType){
    case 'DATE_CHANGED':
      store.waitfor(dateStoreToken);
      updateAndEmit(action.startDate, action.endDate);
      break;
  }
}

function updateAndEmit(date, store){

  store.emitChange();
}
