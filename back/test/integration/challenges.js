const chai = require('chai');
const expect = chai.expect;

describe('/challenges', function() {
  describe('GET', function() {
    it('should return an empty list when there are no challenges', async function() {
      const result = await this.app.get('/api/v1/challenges')
      expect(result).to.have.status(200);
      expect(result.body).to.eql([])
    });
  });
});

