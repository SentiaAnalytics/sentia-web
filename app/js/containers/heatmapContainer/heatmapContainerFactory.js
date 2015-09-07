'use strict';

export default function (startDateObservable, endDateObservable, cameraObservable) {
  const error = new Rx.Subject(null);
  const fetchData = x => x;

  const observable = Rx.combineLatest(
    startDateObservable,
    endDateObservable,
    cameraObservable,
    (startDate, endDate, camera) => ({startDate, endDate, camera})
  )
    .filter((x) => x.startDate && x.endDate && x.camera)
    .map(fetchData);


  return {
    error,
    observable
  };
}
