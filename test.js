'use strict';
import R from 'ramda';
import Bacon from 'baconjs';

const bus = Bacon.Bus();
const property = bus.toProperty();

let dispose = property.onValue(x => console.log('1', x))
bus.push(1);
dispose();
dispose = property.onValue(x => console.log('2',x))
