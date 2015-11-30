import R from 'ramda';
import {MongoClient} from 'mongodb';

const mongo = MongoClient.connect('mongodb://192.168.59.103:27017', {});

export const collection = (name) => mongo.collection(name);
export const find = R.curry((query, db) => db.find(query));
export const findOne = R.curry((query, db) => db.findOne(query));
export const toArray = (db) => db.toArray();
