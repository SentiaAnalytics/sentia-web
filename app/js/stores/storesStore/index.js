'use strict';
import storeFactory from '../../services/storeFactory';
import * as storesAPI from './api';

let store = storeFactory();
let Store;


export function getSelectedStore(){
  return R.clone(Store);
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
    case 'FETCH_STORE':
      storesAPI.fetchStore(action.storeId);
      break;
    case 'STORE_CHANGED':
      updateAndEmit(action.store);
      break;
  }
}

function updateAndEmit(newStore){
  Store = R.clone(newStore);
  store.emitChange();
}
