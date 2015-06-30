'use strict';
import storeFactory from '../../services/storeFactory';
import * as dateStore from '../dateStore';
import * as storesStore from '../storesStore';
import * as helper from './helper';
import * as api from './api';

const store = storeFactory();
let PosData;

export function get(){
  return PosData;
}

export function onChange(listener){
  return store.onChange(listener);
}

export function removeListener(listener){
  return store.removeListener(listener);
}

export const dispatchToken = store.register(actionListener);

function actionListener(action){
  switch(action.actionType){
    case 'DATE_CHANGED':
      store.waitfor([dateStore.dispatchToken]);
      fetchPosData();
      break;
    case 'STORE_CHANGED':
      store.waitfor([storesStore.dispatchToken]);
      fetchPosData();
      break;
    case 'POS_CHANGED':
      updateAndEmit(action.data);
      break;
  }
}

function fetchPosData () {
  const store = storesStore.getSelectedStore();
  const startDate = dateStore.getFromDate();
  const endDate = dateStore.getEndDate();
  console.log(store);
  console.log(startDate);
  console.log(endDate);
  if (!store || !startDate || !endDate) return;

  const query = helper.generateJsonQuery({store, startDate, endDate});
  api.getData(query);
}

function updateAndEmit(data){
  console.log('pos data');
  console.log(data);
  store.emitChange();
}
