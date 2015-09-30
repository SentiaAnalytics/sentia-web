'use strict';
import R from 'ramda';
import Promise from 'bluebird';
import Bacon from 'baconjs';
import moment from 'moment-timezone';
import logger from './services/logger';
import React from 'react';

let namespace = (typeof window !== 'undefined')? window: global;
namespace.R = R;
namespace.Promise = Promise;
namespace.logger = logger;
namespace.moment = moment;
namespace.React = React;
namespace.Bacon = Bacon;
