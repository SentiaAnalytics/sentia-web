'use strict';
import R from 'ramda';
import Promise from 'bluebird';
import moment from 'moment-timezone';
import React from 'react';
import rx from 'rx';


let namespace = (typeof window !== 'undefined')? window: global;

namespace.R = R;
namespace.Promise = Promise;
namespace.moment = moment;
namespace.React = React;
namespace.rx = rx;
