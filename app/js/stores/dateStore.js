'use strict';
import storeFactory from '../services/storeFactory';
import * as sessionAPI from '../services/sessionAPI';

let store = storeFactory();
let startDate = moment().startOf('day');
let endDate = moment().endOf('day');


export function getStartDate(){
  return moment(startDate);
}

export function getEndDate(){
  return moment(endDate);
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
    case 'UPDATE_DATE':
      updateAndEmit(action.startDate, action.endDate);
      break;
  }
}

function updateAndEmit(d1, d2){
  startDate = moment(d1 || startDate).startOf('day');
  endDate = moment(d2 || endDate).endOf('day');
  store.emitChange();
}
