'use strict';
import storeContainer from '../storeContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import http from '../../services/http';
import posContainerFactory from './posContainerFactory';

export default posContainerFactory(
  http,
  startDateContainer.observable,
  endDateContainer.observable,
  storeContainer.observable
);
