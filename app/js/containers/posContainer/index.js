'use strict';
import storeContainer from '../storeContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import helper from './helper';
import posContainerFactory from './posContainerFactory';

export default posContainerFactory(
  helper,
  startDateContainer.observable,
  endDateContainer.observable,
  storeContainer.observable
);
