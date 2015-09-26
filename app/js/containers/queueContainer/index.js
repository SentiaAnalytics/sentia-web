'use strict';
import {startDateContainer, endDateContainer} from '../dateContainer';
import storeContainer from '../storeContainer';
import queueContainerFactory from './queueContainerFactory';
import http from '../../services/http';
export default queueContainerFactory(
  http,
  startDateContainer.observable,
  endDateContainer.observable,
  storeContainer.observable
);
