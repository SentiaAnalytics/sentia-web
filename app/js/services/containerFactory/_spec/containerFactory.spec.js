'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import containerFactory from '../';

describe('containerFactory - create', function () {
    it('should return a container based on a BehaviorSubject', function () {
      let container = containerFactory.create();
      container.observable.onNext(1);
      expect(container.observable.getValue()).to.equal(1);
    });

    it('should return a container with an error container', function () {
      let container = containerFactory.create();
      container.error.onNext(1);
      expect(container.error.getValue()).to.equal(1);
    });

    it('should return a container with the supplied initial value', function () {
        let container = containerFactory.create('hello');
        expect(container.observable.getValue()).to.equal('hello');
    });

    it('should not connect the observer to the observable', function () {
        let container = containerFactory.create(null);
        container.observer.onNext('Value');
        expect(container.observable.getValue()).to.equal(null);
    });

});
