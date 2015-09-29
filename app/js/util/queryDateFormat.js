'use strict';

export default R.curry((startDate, endDate) => {
  const diff = endDate.diff(startDate, 'days');
  if (diff < 3) {
    return "DATE_FORMAT(time, '%Y-%m-%d %H:00:00')";
  }
  if (diff < 60) {
    return "DATE_FORMAT(time, '%Y-%m-%d')";
  }
  return "DATE_FORMAT(time, '%Y-%m')";
})
