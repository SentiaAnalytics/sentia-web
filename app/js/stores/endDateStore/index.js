  'use strict';
import location from '../../services/location';

let store = new rx.BehaviorSubject(moment(location.get('to')).endOf('day'));
let update = new rx.Subject();

export default {
  store,
  update,
};

setup();

function setup () {
  setupUrlUpdate();
  setupLogging();
  setupUpdate();
}

function setupUpdate () {
  update
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
