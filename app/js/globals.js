'use strict';
import R from 'ramda';
import Promise from 'bluebird';
import moment from 'moment';


let namespace = (typeof window !== 'undefined')? window: global;

namespace.R = R;
namespace.Promise = Promise;
namespace.moment = moment;
