'use strict';
import location from '../../services/location';
import storeFactory from '../../services/storeFactory';

let store = storeFactory.create(moment(location.get('from')).startOf('day'));

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
  .map(date => date.startOf('day'))
  .filter(date=> !date.isSame(store.getValue()))
  .subscribe(store);
}

function setupUrlUpdate () {
return store
  .tap(x => console.log('SETTING START DATE', x.toDate()))
  .map(date => date.format('YYYY-MM-DD'))
  .subscribe(location.set('from'));
}

function setupLogging () {
return store.subscribe(
  x => x,
  (err) => console.error('startDate', err));
}
