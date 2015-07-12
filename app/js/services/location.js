'use strict';
// import url from 'url';
import Router from 'react-router';
import url from 'url';

export default {
  get,
  set: R.curry(set)
};
function get (prop) {
  return getQuery(url.parse(window.location.href))[prop];
}

function set (prop, value) {
  let location = url.parse(window.location.href);
  R.pipe(
    () => getQuery(location),
    R.assoc(prop, value),
    R.toPairs,
    R.map(pair => pair.join('=')),
    pairs => pairs.join('&'),
    (querystring) => R.assoc('search', `?${querystring}`, location),
    (location) => location.format(),
    url => history.replaceState({}, null, url)
  )();

}

function getQuery (location) {

  //create a list of pairs, then create an object from the list
  return R.pipe(
    () => location.query || '',
    queryString => queryString.split('&'),
    R.map((stringPair) => stringPair.split('=')),
    R.fromPairs
  )();
}
