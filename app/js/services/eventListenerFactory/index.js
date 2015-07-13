'use strict';
import {getEnumerablePropertyNames} from '../../util';

export default {
  create,
};

function create () {
    var subject = function() {
        subject.onNext.apply(subject, arguments);
    };

    getEnumerablePropertyNames(rx.Subject.prototype)
    .forEach(function (property) {
        subject[property] = rx.Subject.prototype[property];
    });
    rx.Subject.call(subject);

    return subject;
}
