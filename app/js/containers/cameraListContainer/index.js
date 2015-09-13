'use strict';
import http from '../../services/http';
import cameraListContainerFactory from './cameraListContainerFactory';
import storeContainer from '../storeContainer';

export default cameraListContainerFactory(http, storeContainer.observable);
