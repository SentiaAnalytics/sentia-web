'use strict';
import containerFactory from '../../services/containerFactory';
import cameralistContainer from '../cameralistContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import helper from './helper';
import peopleContainerFactory from './peopleContainerFactory';

export default peopleContainerFactory(
  helper,
  startDateContainer.observable,
  endDateContainer.observable,
  cameralistContainer.observable
);
