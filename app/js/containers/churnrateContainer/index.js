'use strict';
import cameralistContainer from '../cameralistContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import http from '../../services/http';
import churnrateContainerFactory from './churnrateContainerFactory';

export default churnrateContainerFactory(
  http,
  startDateContainer.observable,
  endDateContainer.observable,
  cameralistContainer.observable
);
