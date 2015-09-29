'use strict';
import dateContainerFactory from './dateContainerFactory';
import location from '../../services/location';

const createContainer = dateContainerFactory(location);

export default {
  startDateContainer: createContainer('from'),
  endDateContainer: createContainer('to')
};
