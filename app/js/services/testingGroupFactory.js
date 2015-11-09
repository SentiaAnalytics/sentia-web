import dateContainerFactory from '../containers/dateContainer/dateContainerFactory';
import storeContainer from '../containers/storeContainer';
import posContainerFactory from '../containers/posContainer/posContainerFactory';
import peopleContainerFactory from '../containers/peopleContainer/peopleContainerFactory';
import cameralistContainerFactory from '../containers/cameralistContainer/cameralistContainerFactory';
import http from './http';

const mockLocation = {
  get() {
    return moment().format('YYYY-MM-DD');
  },
  set() {}
}

export default () => {

  const store = storeContainer
    .observable;

  const startDateContainer = dateContainerFactory();
  const endDateContainer = dateContainerFactory();

  const cameraList = cameralistContainerFactory(http, store)
    .observable;

  const posContainer = posContainerFactory(
    http,
    startDateContainer.observable,
    endDateContainer.observable,
    store
  );

  const peopleContainer = peopleContainerFactory(
    http,
    startDateContainer.observable,
    endDateContainer.observable,
    cameraList.map(R.filter(cam => cam.counter === 'entrance'))
  );


  const revenue = posContainer.observable
    .map(R.map(R.props(['time', 'revenue'])));

  const transactions = posContainer.observable
    .map(R.map(R.props(['time', 'transactions'])));

  const people = peopleContainer.observable
    .map(R.map(R.props(['time', 'people'])));

  return {
    startDateContainer,
    endDateContainer,
    revenue,
    transactions,
    people
  };
};
