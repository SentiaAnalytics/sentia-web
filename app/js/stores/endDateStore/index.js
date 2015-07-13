  'use strict';
import location from '../../services/location';
import storeFactory from '../../services/storeFactory';
let store = storeFactory.create(moment(location.get('to')).endOf('day'));

export default store;

setup();

function setup () {
  setupUrlUpdate();
  setupLogging();
  setupUpdate();
}

function setupUpdate () {
  store.set
    .filter(date => moment.isMoment(date))
    .map(date => date.endOf('day'))
    .filter(date=> !date.isSame(store.getValue()))
    .subscribe(store);
}

function setupUrlUpdate () {
  return store
    .map(date => date.format('YYYY-MM-DD'))
    .subscribe(location.set('to'));
}

function setupLogging () {
  return store.subscribe(
    x => x,
    (err) => console.error('endDate', err));
}
