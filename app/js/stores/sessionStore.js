'use strict';
import R from 'ramda';
import storeFactory from '../services/storeFactory';
import * as sessionAPI from '../services/sessionAPI';

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
      sessionAPI.fetchSession();
      break;
    case 'LOGIN':
      sessionAPI.login(action.credentials);
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
