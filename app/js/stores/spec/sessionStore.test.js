'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import dispatcher from '../../services/dispatcher';
import * as sessionStore from '../sessionStore';

describe.skip('SessionStore', function () {
  describe('actionListener', function () {
    let listener;

    afterEach(function () {
        sessionStore.removeListener(listener);
    });

    it('should update and emit when SESSION_CHANGED is recieved', function (done) {
      let session = {
        user: {
          firstname : 'andreas'
        }
      };
      listener = sinon.spy(function () {
        expect(listener.calledOnce).to.equal(true);
        let call = listener.call(0);
        expect(call.args).to.eql([]);
        expect(sessionStore.get).to.eql(session);
      });

      sessionStore.onChange(listener);

      dispatcher.dispatch({
        actionType: 'SESSION_CHANGED',
        session: session
      });
    });

  });
});
