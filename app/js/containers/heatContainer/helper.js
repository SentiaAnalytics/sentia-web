'use strict';
// Object -> String
const buildQuery = R.compose(R.join('&'), R.map(R.join('=')), R.toPairs)

// Object -> String
export const buildUrl = R.compose(R.concat('/api/maps?'), buildQuery);
