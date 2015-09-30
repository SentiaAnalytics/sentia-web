'use strict';
import cameralistContainer from '../cameralistContainer';
import {startDateContainer, endDateContainer} from '../dateContainer';
import http from '../../services/http';
import peopleContainerFactory from './peopleContainerFactory';

export default peopleContainerFactory(
  http,
  startDateContainer.observable,
  endDateContainer.observable,
  cameralistContainer.observable
    .map(R.filter(cam => cam.counter === 'entrance'))
);
