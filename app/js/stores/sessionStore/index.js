'use strict';
import storeFactory from '../../services/storeFactory';
import * as api from './api';

let store = storeFactory();
let Session;


export function get(){
  return R.clone(Session);
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
    case 'FETCH_SESSION':
      api.fetchSession();
      break;
    case 'LOGIN':
      api.login(action.credentials);
      break;
    case 'SESSION_CHANGED':
      updateAndEmit(action.session);
      break;
  }
}

function updateAndEmit(session){
  Session = R.clone(session);
  store.emitChange();
}
