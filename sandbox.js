 'use strict';
 var _ = require('lodash');
var moment = _.partialRight(require('moment-timezone').tz, 'Europe/Copenhagen');


 var d = moment(new Date());

 console.log(d.toString());
 console.log(d.tz('UTC').toString());
