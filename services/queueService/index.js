'use strict';
import R from 'ramda';
import moment from 'moment';
import mysql from '../../helpers/mysql';
import squel from 'squel';
const toPromise = data => Promise.resolve(data);
const buildQuery = (query) => {
  return squel.select()
    .from('queues')
    .field('time')
    .field('queue')
    .where('store = ?', query.store)
    .where('date(time) >= ?', moment(query.from).format('YYYY-MM-DD HH:mm:ss'))
    .where('date(time) <= ?', moment(query.to).format('YYYY-MM-DD HH:mm:ss'))
    .toString();

}
const get = R.composeP(mysql.query, buildQuery, toPromise);

export default {
  get
};
