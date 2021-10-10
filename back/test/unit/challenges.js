const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

describe('/challenges', function() {
  describe('something', function() {
    it('array test', function() {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});
