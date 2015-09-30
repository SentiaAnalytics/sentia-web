'use strict';
import http from '../../services/http';
import storeContainer from '../storeContainer';
import cameralistContainerFactory from './cameralistContainerFactory';

export default cameralistContainerFactory(http, storeContainer.observable);
