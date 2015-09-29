import http from '../../services/http';
import {startDateContainer, endDateContainer} from '../dateContainer';
import cameraContainer from '../cameraContainer';
import heatContainerFactory from './heatContainerFactory';

export default heatContainerFactory(
  http,
  startDateContainer.observable,
  startDateContainer.observable,
  cameraContainer.observable
);
