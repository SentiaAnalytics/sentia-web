'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _expect = require('chai');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _dispatcher = require('../../services/dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _import = require('../dateStore');

var dateStore = _interopRequireWildcard(_import);

'use strict';

global.moment = _moment2['default'];

describe('dateStore', function () {
  it('should update values and emit change when recieving "UPDATE_DATE"', function () {
    var listener = _sinon2['default'].spy();
    var action = {
      actionType: 'UPDATE_DATE',
      startDate: _moment2['default'](9999999),
      endDate: _moment2['default'](7777777)
    };
    dateStore.onChange(listener);
    _dispatcher2['default'].dispatch(action);
    var startDate = dateStore.getStartDate();
    var endDate = dateStore.getEndDate();

    _expect.expect(listener.calledOnce).to.equal(true);
    _expect.expect(listener.args[0][0]).to.equal(undefined);
    _expect.expect(startDate.isSame(action.startDate.startOf('day'))).to.equal(true);
    _expect.expect(endDate.isSame(action.endDate.endOf('day'))).to.equal(true);
  });
});
