'use strict';
import http from '../../services/http';
import cameralistContainerFactory from './cameralistContainerFactory';
import storeContainer from '../storeContainer';

export default cameralistContainerFactory(http, storeContainer.observable);
