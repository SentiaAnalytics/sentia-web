'use strict';
import location from '../../services/location';

let store = new rx.BehaviorSubject(moment(location.get('from')).startOf('day'));
let update = new rx.Subject();

export default {
  store,
  update,
};
 setup();

function setup () {
  setupUrlUpdate();
  setupUpdate();
  setupLogging();
}

function setupUrlUpdate () {
  store
    .map(date => date.format('YYYY-MM-DD'))
    .subscribe(location.set('from'));
}

function setupUpdate () {
  update
    .filter(date => moment.isMoment(date))
    .map(date => date.startOf('day'))
    .filter(date=> !date.isSame(store.getValue()))
    .subscribe(store);
}

function setupLogging () {
  store.subscribe(
    x => x,
    (err) => console.error('startDate', err));
}
