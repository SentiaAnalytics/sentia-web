'use strict';
import R from 'ramda';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import logger from './services/logger';
import React from 'react';
import Rx from 'rx';


let namespace = (typeof window !== 'undefined')? window: global;

namespace.R = R;
namespace.Promise = Promise;
namespace.logger = logger;
namespace.moment = moment;
namespace.React = React;
namespace.Rx = Rx;
