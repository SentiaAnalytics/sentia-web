'use strict';
import location from '../services/location';
export default R.curry((prop, container) => {
  container.observer.push(moment(location.get(prop)));
  return container.observable.onValue(time => location.set(prop, time.format('YYYY-MM-DD')));
});
