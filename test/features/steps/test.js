'use strict';
module.exports = function () {
  this.When(/I run a cucumber test/, function (done) {
     console.log('running cucumber test');
     done();
  });
  this.Then(/I should see a result/, function (done) {
    console.log('test run succesfully');
    done();
  });
}
