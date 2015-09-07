'use strict';
import startDateContainer from '../startDateContainer';
import endDateContainer from '../endDateContainer';
import cameraContainer from '../cameraContainer';
import heatmapContainerFactory from './heatmapContainerFactory';

export default heatmapContainerFactory(startDateContainer, endDateContainer, cameraContainer);
