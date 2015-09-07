'use strict';
import dateContainerFactory from './dateContainerFactory';
import location from '../../services/location';

const mapStartDate = (date) => date.startOf('day');
const mapEndDate = (date) => date.endOf('day');
const createContainer = dateContainerFactory(location);

export default {
  startDateContainer: createContainer('from', mapStartDate),
  endDateContainer: createContainer('to', mapEndDate)
};
