'use strict';
import peopleContainerFactory from '../peopleContainer/peopleContainerFactory';
import {startDateContainer} from '../dateContainer';
import cameraContainer from '../cameraContainer';
import http from '../../services/http';

export default peopleContainerFactory(
  http,
  startDateContainer.observable,
  startDateContainer.observable,
  cameraContainer.observable
    .map(camera => ([camera]))
);
