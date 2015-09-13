'use strict';
import containerFactory from '../../services/containerFactory';
import cameralistContainer from '../cameraListContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import helper from './helper';
import churnrateContainerFactory from './churnrateContainerFactory';

export default churnrateContainerFactory(
  startDateContainer.observable,
  endDateContainer.observable,
  cameraListContainer.observable,
  helper
);
