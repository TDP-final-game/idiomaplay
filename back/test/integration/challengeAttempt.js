const chai = require('chai');
const expect = chai.expect;
const createChallenge = require('../../src/startup/createChallenge')
const STATUSES = require('../../src/constants/statuses.json');

describe('/challengeAttempts', function() {
  describe('POST', function() {
    it('should create a challenge attempt', async function() {
      const challenge = (await createChallenge()).toObject()
      const result = await this.app
        .post('/api/v1/challengeAttempts')
        .send({
          "challengeId": challenge._id
        })
      expect(result).to.have.status(200);
      expect(result.body.challengeInfo).to.eql(challenge.challengeInfo)
      expect(result.body.status).to.eql(STATUSES.IN_PROGRESS)
      expect(result.body.unitsAttempts[0].unitInfo).to.eql(challenge.units[0].unitInfo)
      expect(result.body.unitsAttempts[0].status).to.eql(STATUSES.PENDING)
      expect(result.body.unitsAttempts[0].lessonsAttempts).to.eql([])
    });
  });
});
