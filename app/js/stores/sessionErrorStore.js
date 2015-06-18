'use strict';
import R from 'ramda';
import storeFactory from '../services/storeFactory';

let store = storeFactory();
let LoginError;


export function get(){
  return R.clone(LoginError);
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
    case 'LOGIN_ERROR':
      updateAndEmit('Invalid email or password');
      break;
    case 'SESSION_ERROR':
      updateAndEmit('Missing Session');
      break;
  }
}

function updateAndEmit(error){
    LoginError = R.clone(error);
    store.emitChange();
}
