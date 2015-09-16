import http from '../../services/http';
import {startDateContainer, endDateContainer} from '../dateContainer';
import cameraContainer from '../cameraContainer';
import heatContainerFactory from './heatContainerFactory';

export default heatContainerFactory(
  http,
  startDateContainer.observable,
  endDateContainer.observable,
  cameraContainer.observable
);
