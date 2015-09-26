'use strict';
import dateContainerFactory from '../containers/dateContainer/dateContainerFactory';
import storeContainer from '../containers/storeContainer';
import posContainerFactory from '../containers/posContainer/posContainerFactory';
import posContainerHelper from '../containers/posContainer/helper';
import peopleContainerFactory from '../containers/peopleContainer/peopleContainerFactory';
import peopleContainerHelper from '../containers/peopleContainer/helper';
import cameraListContainerFactory from '../containers/cameraListContainer/cameraListContainerFactory';
import http from './http';

const mockLocation = {
  get() {
    return moment().format('YYYY-MM-DD');
  },
  set() {}
}

const mapStartDate = (date) => date.startOf('day');
const mapEndDate = (date) => date.endOf('day');

export default () => {

  const store = storeContainer
    .observable;

  const startDateContainer = dateContainerFactory(mockLocation, '', mapStartDate);
  const endDateContainer = dateContainerFactory(mockLocation, '', mapStartDate);

  const cameraList = cameraListContainerFactory(http, store)
    .observable;

  const posContainer = posContainerFactory(
    posContainerHelper,
    startDateContainer.observable,
    endDateContainer.observable,
    store
  );

  const peopleContainer = peopleContainerFactory(
    peopleContainerHelper,
    startDateContainer.observable,
    endDateContainer.observable,
    cameraList
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
}
