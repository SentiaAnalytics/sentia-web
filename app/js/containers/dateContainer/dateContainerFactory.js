'use strict';
export default () => {
  const observer = new Bacon.Bus();
  const observable = observer
    .filter(date => moment.isMoment(date))
    .doError(logger.error('Datecontainer Error:'))
    .toProperty();

  return {
    observer,
    observable
  };
};
