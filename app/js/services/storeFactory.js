'use strict';
import dispatcher from './dispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

export default function () {
  var emitter = new EventEmitter();
  return {
    onChange: onChange,
    removeListener: removeListener,
    emitChange: emitChange,
    register: register,
    waitFor: waitFor
  };

  function waitFor (tokens) {
    dispatcher.waitFor(tokens);
  }

  function onChange (callback) {
    emitter.on(CHANGE_EVENT, callback);
  }

  function removeListener (callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
  }

  function emitChange (data) {
    emitter.emit(CHANGE_EVENT, data);
  }

  function register (callback) {
    return dispatcher.register(callback);
  }
}
