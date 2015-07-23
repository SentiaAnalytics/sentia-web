'use strict';
import location from '../../services/location';
import containerFactory from '../../services/containerFactory';

let container = containerFactory.create(moment(location.get('from')).startOf('day'));

export default container;

setup();

function setup () {
setupUrlUpdate();
setupLogging();
setupUpdate();
}

function setupUpdate () {
container.observer
  .filter(date => moment.isMoment(date))
  .map(date => date.startOf('day'))
  .filter(date=> !date.isSame(container.observable.getValue()))
  .subscribe(container.observable);
}

function setupUrlUpdate () {
return container.observable
  .map(date => date.format('YYYY-MM-DD'))
  .subscribe(location.set('from'));
}

function setupLogging () {
return container.observable
  .subscribe(
    x => x,
    (err) => console.error('startDate', err));
}
