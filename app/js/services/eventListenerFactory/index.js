'use strict';
import {getEnumerablePropertyNames} from '../../util';

export default {
  create,
};

function create () {
    var subject = function() {
        subject.onNext.apply(subject, arguments);
    };

    getEnumerablePropertyNames(Rx.Subject.prototype)
    .forEach(function (property) {
        subject[property] = Rx.Subject.prototype[property];
    });
    Rx.Subject.call(subject);

    return subject;
}
