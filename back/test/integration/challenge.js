const chai = require('chai');
const expect = chai.expect;
const createChallenge = require('../../src/startup/createChallenge')
const challenge = require('../../src/startup/challenge');

describe('/challenges', function() {
  describe('GET', function() {
    it('should return an empty list when there are no challenges', async function() {
      const result = await this.app.get('/api/v1/challenges')
      expect(result).to.have.status(200);
      expect(result.body).to.eql([])
    });

    it('should return the challenges when there are some', async function() {
      await createChallenge();
      const result = await this.app.get('/api/v1/challenges')
      expect(result).to.have.status(200);
      challenge.__v = result.body[0].__v
      challenge._id = result.body[0]._id
      expect(result.body).to.deep.equal([challenge])
    });
  });
});
