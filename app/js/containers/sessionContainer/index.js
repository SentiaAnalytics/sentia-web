'use strict';
import sessionContainerFactory from './sessionContainerFactory';
import http from '../../services/http';
export default sessionContainerFactory(http);
