'use strict';
import cameraPeopleContainerFactory from './cameraPeopleContainerFactory';
import {startDateContainer, endDateContainer} from '../dateContainer';
import cameraContainer from '../cameraContainer';
import helper from './helper';

export default cameraPeopleContainerFactory(
  startDateContainer.observable,
  endDateContainer.observable,
  cameraContainer.observable,
  helper
);
